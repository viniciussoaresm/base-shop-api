import mongoose, { Schema, Document } from 'mongoose';

// Definição do modelo de Categoria
interface ICategory {
  name: string;
  description: string;
}

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: mongoose.Types.ObjectId; 
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export { Product, Category };
