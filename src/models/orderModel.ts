import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId; // Referência ao usuário (cliente)
  items: IOrderItem[]; // Itens comprados
  totalPrice: number; // Total da venda
  status: string; // Status da venda (pendente, pago, enviado, etc.)
  createdAt: Date; // Data da venda
}

const orderItemSchema: Schema<IOrderItem> = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pendente' }, // Exemplo de status
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
