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

  export const AuthValidation = {
    createUserZodSchema: LoginZodSchema
  }
