/* eslint-disable no-var */
/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
} from './auth.Interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwt.helpers';
import 'colors';

export const authServices = async (
  payload: ILogin
): Promise<ILoginResponse> => {
  const { id, password } = payload;

  ///could not get statics method without declar the the instance

  // const isUserExist = await User.findOne({id},{id:1,password:1,needsPasswordsChange:1}).lean()

  const isUserExist = await User.isUserExistsMethod(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not match');
  }
  // const isPassMatch = await bcrypt.compare( password,isUserExist?.password)

  // const isPassMatch = await user.isPasswordMatch(password,isUserExist?.password)

  if (
    isUserExist.password &&
    !(await User.isPasswordMatchMethod(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is not correct');
  }

  const { id: userId, role, needsPasswordsChange } = isUserExist;
  //   jwt part ///
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // eslint-disable-next-line no-console
  console.log(
    'accessToken',
    accessToken,
    'refreshToken',
    refreshToken,
    'refreshToken',
    needsPasswordsChange
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordsChange,
  };
  // return payload
};

export const refreshTokenServices = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  console.log(token, 'from refreshTokenService');
  // verify token
  let verifiedToken = null;
  // console.log(config.env,"connnnnnnnn");

  try {
    // verifiedToken = jwt.verify(token, config.jwt.refresh_secret );
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    // console.log(verifiedToken,"verifiend");
  } catch (error) {
    // console.log(error,"from refreshToken");

    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refreshToken');
  }
  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExistsMethod(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const changePasswordServices = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  console.log(oldPassword, newPassword);

  // const isUserExist = await User.isUserExistsMethod(user?.userId);


  const isUserExist = await User.findOne({id:user?.userId}).select('+password')
  console.log(isUserExist,"Is UserExits");

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exits ');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatchMethod(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Old Password is not correct');
  }
  // hash password before saver

  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds as string)
  // )


  // const updatePassData = {
  //   password: newHashedPassword,
  //   needsPasswordsChange: false,
  //   passwordChangedAT: new Date(),
  // };
  // const updateResult = await User.findByIdAndUpdate(
  //   { id: user?.userId },
  //   updatePassData
  // );
  // console.log(updateResult);

  isUserExist.password =newPassword

  isUserExist.save()



};
