import { Request, Response } from 'express';
import { Category } from '../models/productModel';

const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        res.status(400).json({ message: 'Categoria já existente.' });
        return ;
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json({ message: 'Categoria criada com sucesso', category: newCategory });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar categoria', error: err });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error: err });
  }
};

export { createCategory, getAllCategories };
