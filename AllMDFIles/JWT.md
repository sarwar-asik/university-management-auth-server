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

        import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

                const createToken = ( payload: Record<string, unknown>, secret: Secret, expiresTime: string
                ): string => {
                return jwt.sign(payload, secret, { expiresIn: expiresTime });
                };

                const verifyToken =(token:string,secret:Secret):JwtPayload =>{
                return jwt.verify(token,secret) as JwtPayload
                }

                export const jwtHelpers = {
                createToken,
                verifyToken
                };



###   modules>user.service.ts(get access token) :::

   
    const accessToken = jwtHelpers.createToken({userId,role},config.jwt.secret as Secret, config.jwt.expires_in as string)

    const refreshToken = jwtHelpers.createToken({userId,role},config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string)

    console.log("accessToken",accessToken,"refreshToken",refreshToken ,"refreshToken",needsPasswordsChange)


### install cookie parser   in app.ts


             npm install cookie-parser
             npm i @types/cookie-parser (for ts)

### modules>auth>login.services.ts (for Login) ::::



                        
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

  
            return {
                accessToken,
                refreshToken,
                needsPasswordsChange,
            };

### modules>auth>login.services.ts (for refreshToken) ::::



    export const refreshTokenServices = async (token: string):Promise<IRefreshTokenResponse> => {
       
        // verify token
        let verifiedToken = null;
     

        try {
            // verifiedToken = jwt.verify(token, config.jwt.refresh_secret );   ///or///
            verifiedToken = jwtHelpers.verifyToken(token,config.jwt.refresh_secret as Secret)
       
        } catch (error) {
    

            throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refreshToken');
        }
        const { userId } = verifiedToken;

        const isUserExist = await User.isUserExistsMethod(userId);
        if (!isUserExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
        }


        const newAccessToken = jwtHelpers.createToken({id:isUserExist?.id,role:isUserExist?.role},
            config.jwt.secret as Secret,
            config.jwt.expires_in as string
            )

            return {
            accessToken: newAccessToken
            }



        
        };   
### modules>auth>login.controller.ts (for loginUser) ::::


                    
                const loginController = catchAsync(async (req: Request, res: Response) => {
                    const { ...loginData } = req.body;

                    
                    const result = await authServices(loginData);

                    const { refreshToken, ...others } = result;

                    const cookieOption = {
                        secure: config.env === 'production',
                        httpOnly: true,
                    };

                    res.cookie('refreshToken', refreshToken, cookieOption);
                

                    if (result) {
                        sendResponse(res, {
                        success: true,
                        message: 'successfully User Login',
                        statusCode: 200,
                        data: others,
                        });
                    }
                })

### modules>auth>login.controller.ts (for refreshToken) ::::


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
