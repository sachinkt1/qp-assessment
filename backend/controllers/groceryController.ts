import { Request, Response } from 'express';
import Grocery from '../models/Grocery';

export const addGrocery = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const grocery = await Grocery.create({ name, price, stock });
    res.status(201).json(grocery);
  } catch (error) {
    res.status(500).json({ error: 'Error adding grocery item' });
  }
};

export const getGroceries = async (_req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching groceries' });
  }
};

export const updateGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    await Grocery.update({ name, price, stock }, { where: { id } });
    res.status(200).json({ message: 'Grocery updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating grocery' });
  }
};

export const deleteGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Grocery.destroy({ where: { id } });
    res.status(200).json({ message: 'Grocery deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting grocery' });
  }
};
