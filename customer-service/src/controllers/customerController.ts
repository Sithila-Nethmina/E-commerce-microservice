import { Request, Response } from "express";
import Customer from "../models/Customer";
import { catchAsync } from "../utils/catchAsync";

export const getAllCustomers = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const customers = await Customer.find();
    res.json(customers);
  },
);

export const getCustomerById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  },
);

export const createCustomer = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  },
);

export const updateCustomer = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  },
);

export const deleteCustomer = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json({ message: "Customer deleted successfully" });
  },
);
