import express from 'express';
import { createProduct, getAllProducts, updateStock } from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createProduct); // Criar um produto
router.get('/', getAllProducts); // Listar todos os produtos, com filtragem de categoria
router.put('/stock', authMiddleware, updateStock); // Atualizar estoque de produto

export default router;
