import { stocklistCronJob,settokenCronJob } from "./stock.cron.js";

export const startCronJob = async () => {
    // settokenCronJob()
    //     .then(() => console.log('✅Token cron started successfully'))
    //     .catch((error) => console.error('❌ Error starting Token cron job:', error));   


    stocklistCronJob('0')
        .then(() => console.log('✅KOSDAQ cron started successfully'))
        .catch((error) => console.error('❌ Error starting Stock cron job KOSDAQ:', error));


        stocklistCronJob('10')
        .then(() => console.log('✅KOSPI cron started successfully'))
        .catch((error) => console.error('❌ Error starting Stock cron job KOSPI:', error));
}
