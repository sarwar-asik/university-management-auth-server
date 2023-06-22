# Create static and instance method of mongoose typeScript

## Instance Method (with typescript)

### modules>users>user.interface.ts ::::::

        export type IUserMethod= {
            isUserExist(id: string): Promise<Partial<IUser> | null>;
            isPasswordMatch(givenPassword: string, savedPassword: string):Promise<boolean>
        }

        export type UserModel = Model<IUser, Record<string, unknown>,IUserMethod>;

### modules>users>user.Schema.ts ::::::

                const userSchema = new Schema<IUser, Record<string, never>, IUserMethod>({
                    name:string,
                    id:string,
                    password:string
                })

                userSchema.methods.isUserExist = async function ( id: string): Promise<Partial<IUser> | null> {
                    const user = await User.findOne(
                        { id },
                        { id: 1, password: 1, needsPasswordsChange: 1 }
                    );
                      return user
                 }

        userSchema.methods.isMachPassword = async function ( givenPassword: string,savedPassword: string): Promise<boolean> {
                return await bcrypt.compare(givenPassword, savedPassword);
        };

#### modules>user>user.service.ts(instance)  :::::
             const user =new  User() 

       const isUserExist  = await user.isUserExist(id)


## Static Method (with typescript)

### modules>users>user.interface.ts ::::::

     export type  UserModel ={ isUserExists(id:string):Promise<Pick<IUser,'id'| 'password'|'needsPasswordsChange'>>
             isPasswordMatch( givenPassword: string,
          savedPassword: string):Promise<boolean | null> 

    } & Model<IUser>

### modules>users>user.Schema.ts ::::::

              const userSchema = new Schema<IUser,UserModel>({
                    name:string,
                    id:string,
                    password:string
                })



        userSchema.statics.isUserExist = async function (id:string):Promise<Pick<IUser,'id'|'password'|'needsPasswordsChange'>| null> {
            const user = await User.findOne(
            { id },
            { id: 1, password: 1, needsPasswordsChange: 1 }
         );
             return user;
        }

        userSchema.statics.isPasswordMatch = async function (  givenPassword: string,
         savedPassword: string):Promise<boolean | null> {
            return await bcrypt.compare(givenPassword, savedPassword);
        }
#### modules>user>user.service.ts (statics) :::::

    const isUserExist  = await User.isUserExists(id)