import { RequestEvent } from "@builder.io/qwik-city";
import prisma from "~/db/prisma";
import { Fail } from "~/models/FailedValidation";
import { Success } from "~/models/SuccessValidation";
import { LoginInput } from "~/models/login";
import { comparePasswords } from "~/utils/helpers";

export const LoginValidator = async (_: RequestEvent, data: any) : Promise<Success | Fail> => {
    if(!data || !(data satisfies LoginInput) || !data.email || data.email.length < 1){
      return {
        success: false,
        status: 400,
        error: {
          email: "Please enter your email."
        }
      };
    }

    const user = await prisma.users.findUnique({
      where: {
        email: data.email
      }
    })
    if(!user){
      return {
        success: false,
        status: 404,
        error: {
          email: "User not found."
        }
      };
    }
    if(!(await comparePasswords(data.password, user.password))){
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
}
