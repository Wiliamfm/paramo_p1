import { $ } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { UserResponse } from '~/models/Response/login.model';
import { log } from '~/services/LogginService';

export const hashPassword = server$(async function(password: string){
  const SALT_ROUNDS = this.env.get("NODE_ENV ")=== 'production' ? 10 : 1;
  return await bcrypt.hash(password, SALT_ROUNDS);
});

export const comparePasswords = $(async (password: string, hashedPassord?: string) => {
  const hash = hashedPassord || await hashPassword(password);
  return await bcrypt.compare(password, hash);
})

export const createJWT = server$(async function(data: UserResponse){
  const secret = new TextEncoder().encode(this.env.get("JWT_SECRET"));
  const alg = 'HS256'

  const jwt = await new SignJWT({...data})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(data.email)
    .setExpirationTime("2h")
    .sign(secret)
  return jwt;
})

export const isValidJWT = server$(async function(token: string): Promise<boolean>{
  try{
    const secret = new TextEncoder().encode(this.env.get("JWT_SECRET"));
    //This currentrly validate expiration date.
    const jwtInfo = await jwtVerify(token, secret);
    const currentDate = new Date();
    const expDate = new Date((jwtInfo.payload.exp ?? 0) * 1000);
    if(expDate > currentDate){
      return true;
    }
    return false;
  }catch(error){
    log("[Invalid JWT]" + error);
    return false;
  }
})
