import app from './app.js'; // Add `.js` if using ES Modules and the file extension is `.js`
import { sequelize } from './database/models/index.js';
import { startCronJob } from './crons/cron.js';
import { initRedis } from './ioredis/redis.js';
import { IS_CRON_JOB_START, IS_REDIS_START } from './constant/settings.js';

const PORT = process.env.PORT || 8000;

try {
	await sequelize.authenticate()
		.then(() => {
			console.log('✅ Database connected successfully');

			// Start the server
			app.listen(PORT, () => {
				console.log(`✅ Server is running on port ${PORT}`);

				if(IS_REDIS_START == true) {
					initRedis()
						.then(() => console.log('✅ ioredis initialize successfully'))
						.catch((error) => console.error('❌ Error starting in ioredis:', error));		
				}

				// After the server starts, call the cron job function asynchronously
				if(IS_CRON_JOB_START == true) {
					startCronJob()
						.then(() => console.log('✅ Every Cron job started successfully'))
						.catch((error) => console.error('❌ Error starting in every cron job:', error));
				}

			});
		})
		.catch(() => console.log('❌ Database connection failed !!!'));
	await sequelize.sync(); // { force: true } for reset
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
}