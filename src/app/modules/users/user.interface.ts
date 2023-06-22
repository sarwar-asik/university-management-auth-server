
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordsChange: true | false;
  student?: Types.ObjectId | IStudent;
  // student?:Types.ObjectId ,
  // faculty?:Types.ObjectId | IFaculty,
  faculty?: Types.ObjectId;
  // admin?:Types.ObjectId | IAdmin,
  admin?: Types.ObjectId;
};


// for instance method
// export type IUserMethod= {

//   isUserExist(
//     id: string
//     ): Promise<Partial<IUser> | null>;
//   isPasswordMatch(
//     givenPassword: string, savedPassword: string
//     ):Promise<boolean>
// }

// for statice method ////

  export type  UserModel ={
    isUserExists(id:string):Promise<Pick<IUser,'id'| 'password'|'needsPasswordsChange'>>
    isPasswordMatch( givenPassword: string,
      savedPassword: string):Promise<boolean | null> 

  } & Model<IUser>

// export type UserModel = Model<IUser, Record<string, unknown>,IUserMethod>;
