import { Request, Response } from 'express';
import { Product, Category } from '../models/productModel';

// Criar um novo produto
const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category } = req.body;

  try {
    // Verificar se a categoria existe
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ message: 'Categoria inválida.' });
      return;
    }

    const newProduct = new Product({ name, description, price, stock, category });
    await newProduct.save();

    res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar produto', error: err });
  }
};

// Obter todos os produtos com filtragem por categoria
const getAllProducts = async (req: Request, res: Response) => {
  const { categoryId } = req.params; // Categoria para filtrar

  try {
    let products;

    if (categoryId) {
      products = await Product.find({ category: categoryId }).populate('category');
    } else {
      products = await Product.find().populate('category');
    }

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: err });
  }
};

// Atualizar estoque de um produto
const updateStock = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return;
    }

    product.stock += quantity; // Adiciona ou subtrai do estoque
    await product.save();

    res.status(200).json({ message: 'Estoque atualizado com sucesso', product });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar estoque', error: err });
  }
};

export { createProduct, getAllProducts, updateStock };
