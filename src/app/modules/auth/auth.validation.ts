import { z } from "zod"





const LoginZodSchema = z.object({
  body: z.object({
   id:z.string({
    required_error:"id is required"
   }),
  password:z.string({
    required_error:"Password is required"
   }),
  }),
});


const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required (zod)',
    }),
  }),
});
const changePasswordChange = z.object({
  cookies: z.object({
    oldPassword: z.string({
      required_error: 'oldPassword is required (zod)',
    }),
    newPassword: z.string({
      required_error: 'newPassword is required (zod)',
    }),

  }),
});



  export const AuthValidation = {
    createUserZodSchema: LoginZodSchema,
    refreshTokenZodSchema,
    changePasswordChange
  }
