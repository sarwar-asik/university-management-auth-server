import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

enum Role {
  Seller = "seller",
  Buyer = "buyer",
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    phoneNumber: { type: String, required: true ,unique:true},
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(Role) },
    password: { type: String, required: true },
    budget: {
      type: Number,
      required: function(this: IUser) {
        return this.role === Role.Buyer;
      },
    },
    income: {
      type: Number,
      required: function(this: IUser) {
        return this.role === Role.Seller;
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre<IUser>("save", function (next) {
  if (this.role === Role.Seller) {
    this.budget = 0;
  } else if (this.role === Role.Buyer) {
    this.income = 0;
  }
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
