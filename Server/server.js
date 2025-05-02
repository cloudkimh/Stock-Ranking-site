import app from './app.js'; // Add `.js` if using ES Modules and the file extension is `.js`
import { sequelize } from './database/models/index.js';
import { startCronJob } from './crons/cron.js';
import { IS_CRON_JOB_START } from './constant/settings.js';

const PORT = process.env.PORT || 8000;

try {
	await sequelize.authenticate()
		.then(() => {
			console.log('✅ Database connected successfully');

			// Start the server
			app.listen(PORT, () => {
				console.log(`✅ Server is running on port ${PORT}`);

				// After the server starts, call the cron job function asynchronously
				if(IS_CRON_JOB_START == true) {
					startCronJob()
						.then(() => console.log('✅ Every Cron job started successfully'))
						.catch((error) => console.error('❌ Error starting every cron job:', error));
				}

			});
		})
		.catch(() => console.log('❌ Database connection failed !!!'));
	await sequelize.sync(); // { force: true } for reset
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
}