import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsynce";
import responseHandler from "../../shared/responseHandler";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const {...user} = req.body;

//   console.log(user);

  // Add your logic for creating a user here

  // For example, you can send a response with the created user

  const result= await  UserServices.createUserServices(user)


  console.log(result,"from ussercontrooler");
  
  responseHandler(res,{
    success:true,
    message:"Successfully created user",
    statusCode:201,
    data:result
  })
});

export const userController = { createUser };
