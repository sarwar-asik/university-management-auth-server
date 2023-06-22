

export type ILogin= {
    id:string;
    password:string
}

export type ILoginResponse ={
    accessToken:string,
    refreshToken?:string,
    needsPasswordsChange:boolean
}

export type IRefreshTokenResponse = {
    accessToken: string;
  };

  
