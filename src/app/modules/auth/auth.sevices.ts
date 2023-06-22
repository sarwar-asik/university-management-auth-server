import ApiError from "../../../errors/ApiError"
import { User } from "../users/user.model"
import { ILogin } from "./auth.Interface"
import bcrypt from "bcrypt"




export const authServices =async(payload:ILogin )=>{
    const {id,password} =payload


    const isUserExist = await User.findOne({id},{id:1,password:1,needsPasswordsChange:1}).lean()
    if(!isUserExist){
        throw new ApiError(401,"User does not match")
    }
    const isPassMatch = await bcrypt.compare(
        password,
        isUserExist?.password
    )

    if(!isPassMatch){
        throw new ApiError(401,"Password does not match")
    }
    




    return isUserExist
    // return payload

}