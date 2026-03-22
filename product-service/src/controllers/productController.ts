import { Request, Response } from "express";
import Product from "../models/Product";
import { catchAsync } from "../utils/catchAsync";

export const getAllProducts = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const products = await Product.find();
    res.json(products);
  },
);

export const getProductById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  },
);

export const createProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  },
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  },
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  },
);
