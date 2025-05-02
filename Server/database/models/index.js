import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

// Dynamically import all model files
const models = {};
const modelFiles = fs.readdirSync(__dirname);

for (const file of modelFiles) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(filePath).href;
    const modelModule = await import(fileUrl);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  }
}

// Setup associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };