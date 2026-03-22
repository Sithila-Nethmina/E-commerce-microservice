import mongoose, { Document, Schema } from "mongoose";

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICustomer>("Customer", customerSchema);
