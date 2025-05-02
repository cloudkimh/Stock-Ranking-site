
import cron from "node-cron";

 
import { models } from "../database/models/index.js"; // Adjust the path as needed
import { ThirdPartyApiCall } from "../global/thirdparty.helpers.js";
const { StocklistModel } = models;
export const stocklistCronJob = async (mrkt_tp = "0") => {
  // Schedule the cron job to run every hour
  // cron.schedule("* * * * *", async () => {

    try {
      // Make the API call
      const response = await ThirdPartyApiCall(
        "api/dostk/stkinfo",
        {
          mrkt_tp: mrkt_tp,
        },
        {
          authorization:
            "Bearer W1rp9QvKrrOfvK8iX4sqZG5ddU0VMBjWVC0vipkpfMv_nbqT24FE9P1UwbkYdoVf5l7r1U-IQHSx6_QZIZ5GBw",
          "cont-yn": "N",
          "next-key": "",
          "api-id": "ka10099",
        }
      );

      // Process the response data
      const stockData = response.data?.list || [];
      if (stockData.length === 0) {
        console.log("No stock data received from the API.");
        return;
      }

      // Store the data in the StocklistModel table
      for (const stock of stockData) {
        const existing = await StocklistModel.findOne({ attributes : ['code'] , where: { code: stock.code } });
        if (!existing) {
          await StocklistModel.create({
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
        }else {
          await StocklistModel.update(
            {
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
            },
            { where: { code: stock.code } }
          );
        }
      }
      

      console.log(
        `✅ Stocklist  ${
          mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"
        } Cron job completed successfully `
      );
    } catch (error) {
      console.error(
        `❌ Error in Stocklist Cron job ${
          mrkt_tp === "0" ? "KOSPI" : "KOSDAQ"
        }:`,
        error
      );
    }
  // });
};

export const settokenCronJob = async () => {
  // Schedule the cron job to run every hour
 
    try {
      // Make the API call

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
