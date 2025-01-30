import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'grocery_db',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'password', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  }
);

export default sequelize;
