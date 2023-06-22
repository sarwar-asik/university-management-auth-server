###  JWT with access and refresh token

#### Installation ::::

     npm install jsonwebtoken 
     npm install --save @types/jsonwebtoken  (for typeScript using)
#### .env  ::


    JWT_SECRET = 'very-secret'
    JWT_EXPIRES_IN=1d
    JWT_REFRESH_SECRET='very-refresh-secret'
    JWT_REFRESH_EXPIRES_IN=365d


###  src>app>helpers>jwtHelpers.ts   :::

        import jwt, { Secret } from 'jsonwebtoken';

        const createToken = (
            payload: Record<string, unknown>,
            secret: Secret,
            expiresTime: string
        ): string => {
          return jwt.sign(payload, secret, { expiresIn: expiresTime });
        };

        export const jwtHelpers = {
            createToken,
        };


###   modules>user.service.ts(get access token) :::

   
    const accessToken = jwtHelpers.createToken({userId,role},config.jwt.secret as Secret, config.jwt.expires_in as string)

    const refreshToken = jwtHelpers.createToken({userId,role},config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string)


    console.log("accessToken",accessToken,"refreshToken",refreshToken ,"refreshToken",needsPasswordsChange)

    