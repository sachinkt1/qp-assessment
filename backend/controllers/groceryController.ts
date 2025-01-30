import { Request, Response } from 'express';
import Grocery from '../models/Grocery';

export const addGrocery = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: 'Name, price, and stock are required' });
    }

    const grocery = await Grocery.create({ name, price, stock });
    res.status(201).json({ message: 'Grocery item added', grocery });
  } catch (error) {
    res.status(500).json({ error: 'Error adding grocery item', details: error });
  }
};

export const getGroceries = async (_req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching groceries', details: error });
  }
};

export const updateGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }

    await grocery.update({ name, price, stock });
    res.status(200).json({ message: 'Grocery updated successfully', grocery });
  } catch (error) {
    res.status(500).json({ error: 'Error updating grocery', details: error });
  }
};

export const deleteGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }

    await grocery.destroy();
    res.status(200).json({ message: 'Grocery deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting grocery', details: error });
  }
};
