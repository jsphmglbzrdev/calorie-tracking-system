import express from 'express';
import {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
	getFoodById
} from '../controllers/foodController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addFood);
router.get('/', getFoods);
router.get('/:id', getFoodById);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;
