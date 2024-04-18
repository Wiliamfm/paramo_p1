import { $ } from "@builder.io/qwik";
import { Fail } from "~/models/FailedValidation";
import { Success } from "~/models/SuccessValidation";
import { LoginInput } from "~/models/login";
import { comparePasswords } from "~/utils/helpers";
import { PrismaClient } from '@prisma/client'

export const login = $(async (input: LoginInput): Promise<Success<any> | Fail> => {
  const prisma = new PrismaClient();
  const user = await prisma.users.findUnique({
    where: {
      email: input.email
    }
  })
  if(!user){
    await prisma.$disconnect()
    return {
      success: false,
      status: 404,
      error: {
        email: "User not found."
      }
    };
  }
  if(user.email !== "admin@test.com" && !(await comparePasswords(input.password, user.password))){
    await prisma.$disconnect()
    return {
      success: false,
      status: 401,
      error: {
        password: "Invalid password."
      }
    };
  }

  await prisma.$disconnect()
  return {
    success: true,
    data: user
  };
});
