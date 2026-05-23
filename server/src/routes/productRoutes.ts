import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProducts);
router.post('/', authMiddleware, createProduct);

export default router;
