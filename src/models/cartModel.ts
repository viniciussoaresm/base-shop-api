import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
  product: mongoose.Types.ObjectId; // Produto no carrinho
  quantity: number; // Quantidade do produto
}

interface ICart extends Document {
  user: mongoose.Types.ObjectId; // Referência ao usuário
  items: ICartItem[]; // Itens do carrinho
}

const cartItemSchema: Schema<ICartItem> = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 }, // Default para 1 item
});

const cartSchema: Schema<ICart> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema], // Itens no carrinho
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
