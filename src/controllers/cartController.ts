import { Request, Response } from 'express';
import Cart from '../models/cartModel';
import { Product } from '../models/productModel';
import { Types } from 'mongoose';

// Adicionar produto ao carrinho
const addItemToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Verificar se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return;
    }

    // Verificar se o carrinho do usuário já existe
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Se não existe um carrinho, cria um novo
      cart = new Cart({ user: new Types.ObjectId(userId), items: [] });
    }

    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex >= 0) {
      // Se o produto já estiver no carrinho, atualiza a quantidade
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Se o produto não estiver no carrinho, adiciona um novo item
      cart.items.push({ product: new Types.ObjectId(productId), quantity });
    }

    // Salvar o carrinho
    await cart.save();

    res.status(200).json({ message: 'Produto adicionado ao carrinho', cart });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho', error: err });
  }
};

// Atualizar a quantidade de produto no carrinho
const updateCartItemQuantity = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Verificar se o carrinho do usuário existe
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        res.status(404).json({ message: 'Carrinho não encontrado.' });
        return; 
    }

    // Verificar se o produto está no carrinho
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
        res.status(404).json({ message: 'Produto não encontrado no carrinho.' });
        return;
    }

    // Atualizar a quantidade do produto
    cart.items[itemIndex].quantity = quantity;

    // Salvar as alterações no carrinho
    await cart.save();

    res.status(200).json({ message: 'Quantidade do produto atualizada', cart });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar carrinho', error: err });
  }
};

// Remover um item do carrinho
const removeItemFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    // Verificar se o carrinho do usuário existe
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        res.status(404).json({ message: 'Carrinho não encontrado.' });
        return; 
    }

    // Remover o item do carrinho
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Salvar as alterações no carrinho
    await cart.save();

    res.status(200).json({ message: 'Produto removido do carrinho', cart });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover produto do carrinho', error: err });
  }
};

// Obter o conteúdo do carrinho
const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Verificar se o carrinho do usuário existe
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        res.status(404).json({ message: 'Carrinho não encontrado.' });
        return; 
    }

    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter carrinho', error: err });
  }
};

export { addItemToCart, updateCartItemQuantity, removeItemFromCart, getCart };
