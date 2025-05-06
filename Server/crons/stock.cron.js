import dayjs from 'dayjs';
import { models } from "../database/models/index.js"; // Adjust the path as needed
import { isEmpty, valueConvertIntoInteger } from "../global/common.helpers.js";
import { ThirdPartyApiCall } from "../global/thirdparty.helpers.js";
const { StocklistModel, StockinfoModel, StockdetailModel } = models;

export const settokenCronJob = async () => {
   // Schedule the cron job to run every hour

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
      console.log("✅ Token Cron job completed successfully ", response.data?.token); 
      return response.data?.token;
   } catch (error) {
      console.error("❌ Error in token Cron job:", error);
   }
};

export const stockListCronJob = async (mrkt_tp = "0") => {
   try {
      console.log(`🕐 Stock list ${mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"} Cron running every 24 hours`);
      const response = await ThirdPartyApiCall(
         "api/dostk/stkinfo",
         {
            mrkt_tp: mrkt_tp,
         },
         {
            authorization: "Bearer jKEb-51lKb2Ku65Fg7LW6QnH7esoXjnJ1TFdG825bstP0okA7Wb8lH_fgdj2bdoWdBir7hz2Q2RIQM1uZiD-lg",
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
            "nxtEnable"
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
         let stockInfoAry = [];
         // let i = 1;
         for await (let stock of stockList) {
            let stk_cd = stock.code;
            const response = await ThirdPartyApiCall(
               "api/dostk/stkinfo",
               {
                  stk_cd
               },
               {
                  authorization: "Bearer jKEb-51lKb2Ku65Fg7LW6QnH7esoXjnJ1TFdG825bstP0okA7Wb8lH_fgdj2bdoWdBir7hz2Q2RIQM1uZiD-lg",
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

            // if(i > 10) {
            //    break;
            // }
            // i++;
         }

         // Perform bulk upsert
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
         const currentDate = dayjs().format('YYYYMMDD');
         // console.log("currentDate ===>> ",currentDate);
         
         let stockDetailAry = [];
         let i = 1;
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
                  authorization: "Bearer jKEb-51lKb2Ku65Fg7LW6QnH7esoXjnJ1TFdG825bstP0okA7Wb8lH_fgdj2bdoWdBir7hz2Q2RIQM1uZiD-lg",
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

            if(i > 1) {
               break;
            }
            i++;
         }

         // Perform bulk upsert
         await StockdetailModel.bulkCreate(stockDetailAry, {
            updateOnDuplicate: ["dt", "cur_prc", "pre_sig", "pred_pre", "flu_rt", "acc_trde_qty", "acc_trde_prica", "ind_invsr", "frgnr_invsr", "orgn", "fnnc_invt", "insrnc", "invtrt", "etc_fnnc", "bank", "penfnd_etc", "samo_fund", "natn", "etc_corp", "natfor"]

         });
      }

      // console.log("stockList ===>> ",stockList[0]);
      
   } catch (error) {
      console.error("❌ Error in Stock detail Cron job:", error);
   }
}

