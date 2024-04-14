import { $ } from '@builder.io/qwik';
import bcrypt from 'bcryptjs';
import { JWTPayload, SignJWT } from 'jose';
import { env } from 'process';

export const hashPassword = $(async (password: string) => {
  const SALT_ROUNDS = env.NODE_ENV === 'production' ? 10 : 1;
  return await bcrypt.hash(password, SALT_ROUNDS);
});

export const comparePasswords = $(async (password: string, hashedPassord?: string) => {
  const hash = hashedPassord || await hashPassword(password);
  return await bcrypt.compare(password, hash);
})

export const createJWT = $(async (data: JWTPayload) => {
  //TODO: move to env
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  const alg = 'HS256'

  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    //.setIssuer('urn:example:issuer')
    //.setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(secret)
  return jwt;
})
