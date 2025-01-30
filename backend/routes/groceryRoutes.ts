import express from 'express';
import { addGrocery, getGroceries, updateGrocery, deleteGrocery } from '../controllers/groceryController';
import { authenticateUser, authorizeRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getGroceries);
router.post('/add', authenticateUser, authorizeRole(['admin']), addGrocery);
router.put('/update/:id', authenticateUser, authorizeRole(['admin']), updateGrocery);
router.delete('/delete/:id', authenticateUser, authorizeRole(['admin']), deleteGrocery);

export default router;
