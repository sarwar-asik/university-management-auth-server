/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-console */

import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import configTs from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordsChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordsChange: 1 }
//   );
//   return user;
// };

// userSchema.methods.isMachPassword = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

userSchema.statics.isUserExistsMethod = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'needsPasswordsChange' | 'role'
> | null> {
  // console.log('isUserExtists');
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordsChange: 1 }
  );
  return user;
};

userSchema.statics.isPasswordMatchMethod = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean | null> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


userSchema.pre('save', async function (next) {
  /////  hassing user password
  // hash password ///
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(configTs.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
