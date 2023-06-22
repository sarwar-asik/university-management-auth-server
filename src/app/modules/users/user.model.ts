/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from "bcrypt"
import configTs from '../../../config.ts';

const userSchema = new Schema<IUser>(
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
    student:{
      type:Schema.Types.ObjectId,
      ref:'Student'

    },
    faculty:{
      type:Schema.Types.ObjectId,
      ref:'Faculty'

    },
    admin:{
      type:Schema.Types.ObjectId,
      ref:'Admin'

    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save',async function(next){
  /////  hassing user password
  // hash password ///
  const user = this
user.password  = await bcrypt.hash(
  
  user.password,
  Number(configTs.bcrypt_salt_rounds)
  )
  next()


})

export const User = model<IUser, UserModel>('User', userSchema);
