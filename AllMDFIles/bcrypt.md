## For password validation put and get in mongodb 

### modules>user>user.service.ts ::::
        import bcrypt from 'bcrypt'; 

        <!-- for creating a hash password -->
        user.password = await bcrypt.hash(
            user.password,
            12
        );
        <!-- for campare password in login (in login.ts) -->

    const isPassMatch = await bcrypt.compare( password,isUserExist?.password)

### modules>user>user.model.ts (optional) ::::

        <!-- before create password -->

     userSchema.pre('save', async function (next) {
        
        const user = this;
        user.password = await bcrypt.hash(
            user.password,
          10
        );
        next();
        });

        <!-- for matching password at login  -->

     import bcrypt from 'bcrypt'; 
        userSchema.statics.isPasswordMatch = async function (  givenPassword: string,
         savedPassword: string):Promise<boolean | null> {
        return await bcrypt.compare(givenPassword, savedPassword);
    }

    *** user.service.ts >>>>
    const isPasswordMatch = await User.isPasswordMatch(password,isUserExist?.password)






