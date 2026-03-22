import { Request, Response } from "express";
import Payment from "../models/Payment";
import { catchAsync } from "../utils/catchAsync";

export const getAllPayments = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const payments = await Payment.find();
    res.json(payments);
  },
);

export const getPaymentById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.json(payment);
  },
);

export const createPayment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  },
);

export const updatePayment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.json(payment);
  },
);

export const deletePayment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.json({ message: "Payment voided successfully" });
  },
);
