import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import groceryRoutes from './routes/groceryRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'grocery_db', 
  process.env.DB_USER || 'user', 
  process.env.DB_PASSWORD || 'password', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  }
);

sequelize.sync().then(() => console.log('Database synced'));

app.use('/api/groceries', groceryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
