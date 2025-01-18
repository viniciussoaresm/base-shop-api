import express from 'express';
import { createOrder, getAllOrders, getOrderById } from '../controllers/orderController';

const router = express.Router();

// Criar um pedido (venda)
router.post('/', createOrder);

// Listar todas as vendas
router.get('/', getAllOrders);

// Buscar uma venda específica
router.get('/:orderId', getOrderById);

export default router;
