import ApiError from "../../../errors/ApiError"
import { User } from "../users/user.model"
import { ILogin } from "./auth.Interface"




export const authServices =async(payload:ILogin )=>{
    const {id,password} =payload

    const user =new  User()  ///could not get statics method without declar the the instance



    // const isUserExist = await User.findOne({id},{id:1,password:1,needsPasswordsChange:1}).lean()

    const isUserExist  = await user.isUserExist(id)


    if(!isUserExist){
        throw new ApiError(401,"User does not match")
    }
    // const isPassMatch = await bcrypt.compare( password,isUserExist?.password)

    // const isPassMatch = await user.isPasswordMatch(password,isUserExist?.password)

    if(isUserExist.password && !user.isPasswordMatch(password,isUserExist?.password)){
        throw new ApiError(401,"Password is not correct")
    }





    return isUserExist
    // return payload

}