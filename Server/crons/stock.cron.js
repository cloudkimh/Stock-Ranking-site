import dayjs from 'dayjs';
import { Sequelize } from "sequelize";
import { sequelize, models } from "../database/models/index.js"; // Adjust the path as needed
import { chunkArray, isEmpty, valueConvertIntoInteger } from "../global/common.helpers.js";
import { ThirdPartyApiCall } from "../global/thirdparty.helpers.js";
import { getCache, setCache } from "../ioredis/redis.js";
import { REDIS_KEY } from "../constant/index.js";
const { StocklistModel, StockinfoModel, StockdetailModel } = models;

export const settokenCronJob = async () => {
   try {
      const response = await ThirdPartyApiCall(
         "oauth2/token",
         {
            grant_type: "client_credentials",
            appkey: process.env.API_KEY,
            secretkey: process.env.API_SECRET,
         },
         {}
      );
      // Process the response data
      if (!response.data?.token) {
         console.log("No stock data received from the API.");
         return;
      }

      let token = response.data?.token;
      await setCache({ key: REDIS_KEY.THIRDPARTY_STOCK_API_KEY, value: token });

      console.log("✅ Token Cron job completed successfully"); 
      return token;
   } catch (error) {
      console.error("❌ Error in token Cron job:", error);
   }
};

export const stockListCronJob = async (mrkt_tp = "0") => {
   try {
      console.log(`🕐 Stock list ${mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"} Cron running every 24 hours`);

      let getRedis = await getCache({ key: REDIS_KEY.THIRDPARTY_STOCK_API_KEY});
      let authorization = `Bearer ${getRedis?.value}`;

      const response = await ThirdPartyApiCall(
         "api/dostk/stkinfo",
         {
            mrkt_tp: mrkt_tp,
         },
         {
            authorization,
            "cont-yn": "N",
            "next-key": "",
            "api-id": "ka10099",
         }
      );

      // Process the response data
      const stockData = response.data?.list || [];
      if (stockData.length === 0) {
         console.log(`[Stock Empty] No ${mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"} stock data received from the API !!!`);
         return;
      }

      // Store the data in the StocklistModel table
      const stock_list_ary = [];
      for (const stock of stockData) {
         stock_list_ary.push({
            category: mrkt_tp === "0" ? "KOSPI" : "KOSDAQ",
            code: stock.code,
            name: stock.name,
            listCount: stock.listCount,
            auditInfo: stock.auditInfo,
            regDay: stock.regDay,
            lastPrice: stock.lastPrice,
            state: stock.state,
            marketCode: stock.marketCode,
            marketName: stock.marketName,
            upName: stock.upName,
            upSizeName: stock.upSizeName,
            companyClassName: stock.companyClassName,
            orderWarning: stock.orderWarning,
            nxtEnable: stock.nxtEnable,
         });  
      }

      // Perform bulk upsert
      await StocklistModel.bulkCreate(stock_list_ary, {
         updateOnDuplicate: [
            "name",
            "listCount",
            "auditInfo",
            "regDay",
            "lastPrice",
            "state",
            "marketCode",
            "marketName",
            "upName",
            "upSizeName",
            "companyClassName",
            "orderWarning",
            "nxtEnable",
            "category"
         ]
      });

      // console.log(`✅ Stocklist  ${mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"} Cron job completed successfully `);
   } catch (error) {
      console.error(`❌ Error in Stocklist Cron job ${mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"}:`, error);
   }
};

export const stockInfoCronJob = async () => {
   try {
      let stockList = await StocklistModel.findAll({
         attributes: ['id', 'code'],
         order: [
            ['id', 'ASC']
         ],
         raw: true
      });

      if(!isEmpty(stockList)) {
         let getRedis = await getCache({ key: REDIS_KEY.THIRDPARTY_STOCK_API_KEY});
         let authorization = `Bearer ${getRedis?.value}`;

         const chunkedStockList = await chunkArray(stockList, 100);
         for (const stockList of chunkedStockList) {
            let stockInfoAry = [];
            for await (let stock of stockList) {
               let stk_cd = stock.code;
               const response = await ThirdPartyApiCall(
                  "api/dostk/stkinfo",
                  {
                     stk_cd
                  },
                  {
                     authorization,
                     "cont-yn": "N",
                     "next-key": "",
                     "api-id": "ka10001",
                  }
               );

               // Process the response data
               const stockInfo = response?.data;
               const convertIntKeys = ['fav', 'cap', 'flo_stk', 'mac', 'sale_amt', 'exp_cntr_qty', 'trde_qty', 'dstr_stk', 'return_code'];
               
               let stockInfoObj = await valueConvertIntoInteger(stockInfo, convertIntKeys);
               if(isEmpty(stockInfoObj)) {
                  console.log(`[Stock Info Empty] No stock info received from the API !!!`);
                  return;   
               }
               stockInfoAry.push(stockInfoObj);
            }

            // Perform bulk upsert
            if(!isEmpty(stockInfoAry)) {
               await StockinfoModel.bulkCreate(stockInfoAry, {
                  updateOnDuplicate: [
                     "stk_nm", "setl_mm", "fav", "cap", "flo_stk", "crd_rt", "oyr_hgst", "oyr_lwst", 
                     "mac", "mac_wght", "for_exh_rt", "repl_pric", "per", "eps", "roe", "pbr", "ev", "bps", 
                     "sale_amt", "bus_pro", "cup_nga", "250hgst", "250lwst", "high_pric", "open_pric", "low_pric", 
                     "upl_pric", "lst_pric", "base_pric", "exp_cntr_pric", "exp_cntr_qty", "250hgst_pric_dt", 
                     "250hgst_pric_pre_rt", "250lwst_pric_dt", "250lwst_pric_pre_rt", "cur_prc", "pre_sig", 
                     "pred_pre", "flu_rt", "trde_qty", "trde_pre", "fav_unit", "dstr_stk", "dstr_rt", 
                     "return_code", "return_msg"
                  ]
               });
            }
         }
      }

      // console.log("stockList ===>> ",stockList[0]);
      
   } catch (error) {
      console.error("❌ Error in Stock info Cron job:", error);
   }
}

export const stockDetailCronJob = async () => {
   try {
      let stockList = await StocklistModel.findAll({
         attributes: ['id', 'code'],
         order: [
            ['id', 'ASC']
         ],
         raw: true
      });

      if(!isEmpty(stockList)) {
         let getRedis = await getCache({ key: REDIS_KEY.THIRDPARTY_STOCK_API_KEY});
         let authorization = `Bearer ${getRedis?.value}`;

         const currentDate = dayjs().format('YYYYMMDD');
         // console.log("currentDate ===>> ",currentDate);
         
         const chunkedStockList = await chunkArray(stockList, 100);
         for (const stockList of chunkedStockList) {
            let stockDetailAry = [];
            for await (let stock of stockList) {
               let stk_cd = stock.code;
               const response = await ThirdPartyApiCall(
                  "api/dostk/stkinfo",
                  {
                     dt: currentDate,
                     stk_cd: stk_cd,
                     amt_qty_tp: "1",
                     trde_tp: "0",
                     unit_tp: "1000"
                  },
                  {
                     authorization,
                     "cont-yn": "N",
                     "next-key": "",
                     "api-id": "ka10059",
                  }
               );

               // Process the response data
               // console.log("response?.data ===>> ",response?.data);
               
               const stockDetail = response?.data?.stk_invsr_orgn[0];
               const convertIntKeys = ["acc_trde_qty", "acc_trde_prica", "ind_invsr", "frgnr_invsr", "orgn", "fnnc_invt", "insrnc", "etc_fnnc", "bank", "penfnd_etc", "samo_fund", "natn", "etc_corp", "natfor"]
               ;
               
               let stockDetailObj = await valueConvertIntoInteger(stockDetail, convertIntKeys);
               if(isEmpty(stockDetailObj)) {
                  console.log(`[Stock Detail Empty] No stock Detail received from the API !!!`);
                  return;   
               }
               stockDetailObj.stk_cd = stk_cd; // unique field
               stockDetailAry.push(stockDetailObj);

            }

            if(!isEmpty(stockDetailAry)) {
               // Perform bulk upsert
               await StockdetailModel.bulkCreate(stockDetailAry, {
                  updateOnDuplicate: ["dt", "cur_prc", "pre_sig", "pred_pre", "flu_rt", "acc_trde_qty", "acc_trde_prica", "ind_invsr", "frgnr_invsr", "orgn", "fnnc_invt", "insrnc", "invtrt", "etc_fnnc", "bank", "penfnd_etc", "samo_fund", "natn", "etc_corp", "natfor"]

               });
            }
         }
      }

      // console.log("stockList ===>> ",stockList[0]);
      
   } catch (error) {
      console.error("❌ Error in Stock detail Cron job:", error);
   }
}

export const stockRankCronJob = async () => {
   try {
      let update_rank_query = `
         WITH ranked_data AS (
            SELECT
               id,
               RANK() OVER (ORDER BY cur_prc::NUMERIC DESC) AS cur_prc_rank,
               RANK() OVER (ORDER BY mac::NUMERIC DESC) AS mac_rank,
               RANK() OVER (ORDER BY sale_amt::NUMERIC DESC) AS sale_amt_rank,
               RANK() OVER (ORDER BY bus_pro::NUMERIC DESC) AS bus_pro_rank,
               RANK() OVER (ORDER BY cup_nga::NUMERIC DESC) AS cup_nga_rank,
               RANK() OVER (ORDER BY per::NUMERIC ASC) AS per_rank,
               RANK() OVER (ORDER BY pbr::NUMERIC ASC) AS pbr_rank,
               RANK() OVER (ORDER BY trde_qty::NUMERIC DESC) AS trde_qty_rank
            FROM tbl_stock_info
         )
         UPDATE tbl_stock_info
         SET
            cur_prc_rank = ranked_data.cur_prc_rank,
            mac_rank = ranked_data.mac_rank,
            sale_amt_rank = ranked_data.sale_amt_rank,
            bus_pro_rank = ranked_data.bus_pro_rank,
            cup_nga_rank = ranked_data.cup_nga_rank,
            per_rank = ranked_data.per_rank,
            pbr_rank = ranked_data.pbr_rank,
            trde_qty_rank = ranked_data.trde_qty_rank
         FROM ranked_data
         WHERE tbl_stock_info.id = ranked_data.id
      `;

      await sequelize.query(update_rank_query, {
         type: Sequelize.QueryTypes.SELECT,
         // logging: console.log
      });
      
   } catch (error) {
      console.log("Error in stockRankCron Job ==>> ", error);
   }
}

