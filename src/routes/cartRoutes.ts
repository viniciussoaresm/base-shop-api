import express from 'express';
import { addItemToCart, updateCartItemQuantity, removeItemFromCart, getCart } from '../controllers/cartController';

const router = express.Router();

// Adicionar item ao carrinho
router.post('/', addItemToCart);

// Atualizar quantidade de item no carrinho
router.put('/update', updateCartItemQuantity);

// Remover item do carrinho
router.delete('/remove', removeItemFromCart);

// Obter o conteúdo do carrinho
router.get('/:userId', getCart);

export default router;
