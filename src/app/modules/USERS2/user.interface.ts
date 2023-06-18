import { Model } from "mongoose";

export enum Role {
  Seller = "seller",
  Buyer = "buyer",
}

export type IUser= {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role: Role;
  password: string;
  budget?: number;
  income?: number;
  }

export type UserModel =Model<IUser,Record<string,unknown>>