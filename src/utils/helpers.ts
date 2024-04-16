import { $ } from '@builder.io/qwik';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { env } from 'process';
import { UserResponse } from '~/models/Response/login.model';

export const hashPassword = $(async (password: string) => {
  const SALT_ROUNDS = env.NODE_ENV === 'production' ? 10 : 1;
  return await bcrypt.hash(password, SALT_ROUNDS);
});

export const comparePasswords = $(async (password: string, hashedPassord?: string) => {
  const hash = hashedPassord || await hashPassword(password);
  return await bcrypt.compare(password, hash);
})

export const createJWT = $(async (data: UserResponse) => {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const alg = 'HS256'

  const jwt = await new SignJWT({...data})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(data.email)
    .setExpirationTime('2h')
    .sign(secret)
  return jwt;
})
