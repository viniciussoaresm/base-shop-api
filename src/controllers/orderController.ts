import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import Order from '../models/orderModel';
import { Types } from 'mongoose';

// Criar um novo pedido (venda)
const createOrder = async (req: Request, res: Response) => {
  const { userId, items } = req.body; // userId é o id do cliente e items contém os produtos e suas quantidades
  
  try {
    // Verificar se os produtos estão disponíveis em estoque
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ message: `Produto ${item.product} não encontrado` });
        return;
      }
      if (product.stock < item.quantity) {
        res.status(400).json({ message: `Estoque insuficiente para o produto ${item.product}` });
        return;
      }

      totalPrice += product.price * item.quantity; // Calculando o total
    }

    // Criar o pedido
    const newOrder = new Order({
      user: new Types.ObjectId(userId), // ID do usuário que está fazendo a compra
      items,
      totalPrice,
      status: 'pendente', // Status inicial
    });

    await newOrder.save();

    // Atualizar o estoque dos produtos
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity; // Diminuir o estoque
        await product.save();
      }
    }

    res.status(201).json({ message: 'Venda registrada com sucesso', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar venda', error: err });
  }
};

// Listar todas as vendas
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar vendas', error: err });
  }
};

// Obter uma venda específica
const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('user').populate('items.product');
    if (!order) {
        res.status(404).json({ message: 'Venda não encontrada' });
        return;
    }
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar venda', error: err });
  }
};

export { createOrder, getAllOrders, getOrderById };
