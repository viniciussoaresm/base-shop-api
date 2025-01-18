import express from 'express';
import { createCategory, getAllCategories } from '../controllers/categoryController';

const router = express.Router();

router.post('/', createCategory); // Criar uma categoria
router.get('/', getAllCategories); // Listar todas as categorias

export default router;
