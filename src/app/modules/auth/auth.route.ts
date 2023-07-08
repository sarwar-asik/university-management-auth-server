import express from 'express';

import validateRequest from '../../middlesWare/validateUserRequest';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlesWare/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.createUserZodSchema),
  authController.loginController
);

router.post(
  '/refreshToken',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  authController.refreshTokenController
);
router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(AuthValidation.changePasswordChange),

  authController.changePasswordController
);

// router.get("/",userController.getUser)

export const AuthRouter = router;
