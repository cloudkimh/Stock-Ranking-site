import cron from "node-cron";
import { TIMEZONE } from "../constant/index.js";
import {
  settokenCronJob,
  stockListCronJob,
  stockInfoCronJob,
  stockDetailCronJob,
  stockRankCronJob
} from "./stock.cron.js";

export const startCronJob = async () => {
   // every 24 Hours cron
   cron.schedule("0 0 * * *", async () => {
      // Token generate
      await settokenCronJob()
         .then(() => console.log('✅ Generate Token cron started successfully'))
         .catch((error) => console.error('❌ Error in generate Token cron:', error));
      
      // KOSDAQ
      await stockListCronJob("0")
         .then(() => console.log("✅ KOSDAQ stock list cron completed successfully: Execute every 24 Hours"))
         .catch((error) => console.error("❌ Error in KOSDAQ stock list cron: ", error));

      // KOSPI
      await stockListCronJob("10")
         .then(() => console.log("✅ KOSPI stock list cron completed successfully: Execute every 24 Hours"))
         .catch((error) => console.error("❌ Error in KOSPI stock list cron: ", error));

      // stock info
      await stockInfoCronJob()
         .then(() => console.log("✅ stock info cron completed successfully"))
         .catch((error) =>console.error("❌ Error in stock info cron: ", error));
      
      // stock details
      await stockDetailCronJob()
         .then(() => console.log("✅ stock detail cron completed successfully"))
         .catch((error) => console.error("❌ Error in stock detail cron: ", error));

      // stock rank 
      await stockRankCronJob()
         .then(() => console.log("✅ stock rank cron completed successfully"))
         .catch((error) => console.error("❌ Error in stock rank cron: ", error));
   },
   {
      timezone: TIMEZONE,
      scheduled: true, // Ensures the job starts immediately on app start
   });
};
