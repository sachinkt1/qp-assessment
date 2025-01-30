import { Request, Response } from 'express';
import Order from '../models/Order';
import Grocery from '../models/Grocery';
import User from '../models/User';
import sequelize from '../utils/database';

export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const { userId, groceryId, quantity } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if grocery item exists and has enough stock
    const grocery = await Grocery.findByPk(groceryId);
    if (!grocery) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    if (grocery.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Calculate total price
    const totalPrice = grocery.price * quantity;

    // Create order within transaction
    const order = await Order.create(
      { userId, groceryId, quantity, totalPrice },
      { transaction }
    );

    // Reduce stock
    await grocery.update({ stock: grocery.stock - quantity }, { transaction });

    // Commit transaction
    await transaction.commit();

    res.status(201).json(order);
  } catch (error) {
    await transaction.rollback(); // Rollback in case of error
    res.status(500).json({ error: 'Error placing order', details: error });
  }
};


export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};
