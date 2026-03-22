import mongoose, { Document, Schema } from "mongoose";

export interface IOrderProduct {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  customerId: string;
  products: IOrderProduct[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder>("Order", orderSchema);
