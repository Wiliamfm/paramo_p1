import { component$, useStore, } from "@builder.io/qwik";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { LoginInput } from "~/models/login";
import { loginRequestSchema } from "~/schemas/login.schema";
import { log } from "~/services/LogginService";
import { Fail } from "~/models/FailedValidation";
import { supabase } from "~/utils/supabase";
import { LoginForm } from "~/components/common/loginForm/loginForm";


export const useLogin =routeAction$(async (data, requestEvent) => {
  const response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  })
  if(response.error){
    const error: Fail = {
      success: false,
      error: response.error,
      status: response.error.status ?? 400,
    }
    return requestEvent.fail(error.status, error);
  }
  log(`User ${response.data.user.email} logged in: [TOKEN]: ${response.data.session?.access_token}`);

  throw requestEvent.redirect(302, "/admin");
},
zod$(loginRequestSchema));

export default component$(() => {
  const states = useStore({
    data: { email: "", password: "" } as LoginInput,
  });
  const loginAction = useLogin()
  



  return (
    <div class="flex flex-col items-start justify-center w-full min-h-[70vh] py-5 dark:text-white">
      
      <div class="w-full flex items-center justify-center  ">
      <LoginForm states={states} loginAction={loginAction}/>

      </div>
    </div>
  );
});
