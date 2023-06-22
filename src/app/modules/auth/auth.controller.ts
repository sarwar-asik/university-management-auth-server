/* eslint-disable no-console */
import {  Request, Response } from 'express';


import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import { authServices } from './auth.sevices';

const loginController = catchAsync(async (req: Request, res: Response) => {

  const {...loginData} = req.body;

  console.log(loginData,"asdfsd");
  const result =await authServices(loginData)

  if (result) {
    sendResponse(res, {
      success: true,
      message: 'successfully create semester',
      statusCode: 200,
      data: result,
    });

  }



  

  // console.log(user, 'from controller=================');
 


//   if (result) {
//     sendResponse(res, {
//       success: true,
//       message: 'successfully create semester',
//       statusCode: 200,
//       data: result,
//     });

//   }
});

export const authController = {loginController}