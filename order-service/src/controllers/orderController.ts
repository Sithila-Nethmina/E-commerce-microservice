import { Request, Response } from "express";
import Order from "../models/Order";
import { catchAsync } from "../utils/catchAsync";

export const getAllOrders = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const orders = await Order.find();
    res.json(orders);
  },
);

export const getOrderById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json(order);
  },
);

export const createOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  },
);

export const updateOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json(order);
  },
);

export const deleteOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json({ message: "Order cancelled successfully" });
  },
);
