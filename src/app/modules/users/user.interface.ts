import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'


export type IUser = {
  id: string
  role: string
  password: string,
  needsPasswordsChange: true | false,
  student?:Types.ObjectId | IStudent,
  // student?:Types.ObjectId ,
  // faculty?:Types.ObjectId | IFaculty,
  faculty?:Types.ObjectId ,
  // admin?:Types.ObjectId | IAdmin,
  admin?:Types.ObjectId ,
}

interface IUserMethod {
  isUserExist(id:string):Promise<boolean>
  isPaawordMatch(
    givenPassword:string,
    savedPassword:string
  )
}

export type UserModel = Model<IUser, Record<string, unknown>>
