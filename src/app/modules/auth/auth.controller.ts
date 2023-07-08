/* eslint-disable no-console */
import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import {
  authServices,
  changePasswordServices,
  refreshTokenServices,
} from './auth.sevices';
import config from '../../../config';
import { IRefreshTokenResponse } from './auth.Interface';

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;

  // console.log(passwordData,"asdfsd");
  const result = await authServices(passwordData);

  const { refreshToken, ...others } = result;

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);
  // delete result?.refreshToken

  // or //

  // if('refreshToken' in result){
  //   delete result?.refreshToken
  // }

  if (result) {
    sendResponse(res, {
      success: true,
      message: 'successfully User Login',
      statusCode: 200,
      data: others,
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

const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await refreshTokenServices(refreshToken);

    // set refresh token into cookie

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User lohggedin successfully !',
      data: result || null,
    });
  }
);

const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const { ...passwordData } = req.body;

    await changePasswordServices(user, passwordData);
    sendResponse(res, {
      success: true,
      message: 'successfully Change Password',
      statusCode: 200,
    });
  }
);
export const authController = {
  loginController,
  refreshTokenController,
  changePasswordController,
};
