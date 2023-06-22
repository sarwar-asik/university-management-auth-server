## For password validation put and get in mongodb 

### modules>user>user.service.ts ::::
        import bcrypt from 'bcrypt'; 

    const isPassMatch = await bcrypt.compare( password,isUserExist?.password)

### modules>user>user.model.ts (optional) ::::
     import bcrypt from 'bcrypt'; 
        userSchema.statics.isPasswordMatch = async function (  givenPassword: string,
         savedPassword: string):Promise<boolean | null> {
        return await bcrypt.compare(givenPassword, savedPassword);
    }

    *** user.service.ts >>>>
    const isPasswordMatch = await User.isPasswordMatch(password,isUserExist?.password)






