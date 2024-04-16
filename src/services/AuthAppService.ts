import { $ } from "@builder.io/qwik";
import { Fail } from "~/models/FailedValidation";
import { Success } from "~/models/SuccessValidation";
import { LoginInput } from "~/models/login";
import { comparePasswords } from "~/utils/helpers";

export const login = $(async (input: LoginInput): Promise<Success<any> | Fail> => {
  const user = null;
//  const user = await prisma.users.findUnique({
//    where: {
//      email: input.email
//    }
//  })
  if(!user){
    return {
      success: false,
      status: 404,
      error: {
        email: "User not found."
      }
    };
  }
  if(!(await comparePasswords(input.password))){//, user.password))){
    return {
      success: false,
      status: 401,
      error: {
        password: "Invalid password."
      }
    };
  }

  return {
    success: true,
    data: user
  };
});
