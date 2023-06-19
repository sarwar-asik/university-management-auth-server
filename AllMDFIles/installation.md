## Install for setup the project ===>

#### 1 .

        npm init -y

#### 2 .

     npm install express --save

#### 3 .

         npm i express mongoose

#### 4 . (for ts)

        tsc --init

#### 5 . (change in tsconfig )

          "rootDir":"/src"
          "outDir":"/dist"

#### 6 . (install)

         yarn add dotenv
         yarn add cors with <npm i --save-dev @types/cors>

         yarn add ts-node-dev --dev

#### 7 . (package.json)

     "start":"ts-node-dev --respawn --transpile-only server.ts"

### 8 . Create src>server.ts  :::
                import mongoose from "mongoose";
                import "colors";
                import { Server } from "http";
                import app from "./app";
                import config from "./config";

                process.on("uncaughtException", (err) => {
                console.log("UnCaught rejection is detected from serve.ts", err);
                process.exit(1);
                });

                let server: Server;

                console.log(config.data_url, "data url");

                async function mainFUnction() {
                try {
                await mongoose.connect(config.data_url as string, {
                dbName: "University-management",
                });

                console.log("db Connected successfully ".green.underline.bold);

                server = app.listen(6000, () => {
                console.log(`server app listening on port 6000 `.green.bold);
                });
                } catch (error) {
                // const  {name,message,stack}=error;
                console.log("failed to connect ".red.underline, error);
                }

                process.on("unhandledRejection", (error) => {
                // eslint-disable-next-line no-console
                console.log(
                "UnHandle rejection is detected and closing the main() in serve.ts"
                );
                if (server) {
                server.close(() => {
                        console.log(error);
                        process.exit(1);
                });
                } else {
                process.exit(1);
                }
                });
                }

                process.on("SIGTERM", () => {
                console.log("SIGTERM is received ");
                if (server) {
                server.close();
                }
                });

                mainFUnction();



### 8 . Create src>app.ts.ts :::
        import cors from "cors";
        import express, { Application, NextFunction, Request, Response } from "express";

        const app: Application = express();
        // const port = 3000

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get("/", async (req: Request, res: Response) => {
        res.send({ status: "success", data: "Successfully running" });
        });

        app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(401).json({
        success: false,
        message: "NOt Found",
        errorMessages: [
        {
                path: req.originalUrl,
                message: "API Not Found",
        },
        ],
        });
        next();
        });

        export default app;




### 8 . Create src>config>index.ts
        import dotenv from "dotenv";
        import path from "path";

                dotenv.config({ path: path.join(process.cwd(), ".env") });
                // console.log(process.env, "allEnv");

                export default {
                env: process.env.NODE_ENV,
                data_url: process.env.URL,
                port: process.env.PORT,
                };



### !!!! we can use ErrorRequestHandler for exchange Request,Response,NextFunction

        const getUser:RequestHandler = async (req, res) => {
                try {
                 const data = await User.find()
                 res.send(data)
                } catch (error) {
                 res.status(400).send({ status: 'had an error in getUser Controller', error })
                }
        }

### We can use type UserModel = Model<IUser,Record<string,unknown>> in user.model.ts

# Create a global async function in src>app>shared>catchAsync :::::

         import { NextFunction, Request, RequestHandler, Response } from "express"

        const catchAsync=(fn:RequestHandler)=>{
        return async (req:Request,res:Response,next:NextFunction)=>{
                try {
                await  fn(req,res,next)

                } catch (error) {
                next(error)

                }
        }
        }

        export default catchAsync

### after create src>app>shared>catchAsync we can use it in controller ::::

        const createUser = catchAsync(async (req: Request, res: Responsenext:NextFunction) => {
                const user = req.body;


                const result = await UserService.createUserServices(user);
                next()
                if (result) {res.status(200).send({success: true,message:'successfully data: result,
                  });
                 }
        });

## global res.send create in src>app>shared>senResponse.ts ::::

                import { Response } from 'express';


                type IApiResponse<T>={
                        statusCode: number;
                        success: boolean;
                        message?: string | null;
                        data: T|null;
                }


                const sendResponse = <T>( res: Response, data:IApiResponse<T> ): void => {
                        const ResponseData :IApiResponse<T> ={
                                statusCode: data.statusCode,
                                success: data.success,
                                message: data.message || null,
                                data: data.data || null,
                        }
                         res.status(data.statusCode).json(ResponseData);
                };

                export default sendResponse;

       use in controller >>>>>>>>

         sendResponse(res,{success:true,message:"successfully create semester",statusCode:200,data:result})


### for handle error for  unknown apiii hit error handle in app.ts 

        app.use((req: Request, res: Response, next: NextFunction) => {
                res.status(httpStatus.NOT_FOUND).json({
                        success: false,
                        message: 'NOt Found',
                        errorMessages: [
                        {
                         path:req.originalUrl,
                         message: 'API Not Found',
                        },
                        ],
                });
                next();
        });

## Change a object to an array ;


         Object.keys(YourObject) 
                 ///only key in array['title','year']

         Object.entries(filtersData) 
                ///with key and value [['title','autumn'],['year','2023']]