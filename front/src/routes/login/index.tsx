import { ContextId, component$, createContextId, useStore } from "@builder.io/qwik";
import { isBrowser } from '@builder.io/qwik/build';
import { Form, routeAction$, useLocation, zod$ } from "@builder.io/qwik-city";
import { LoginInput } from "~/models/login";
import { loginRequestSchema } from "~/schemas/login.schema";
import { log } from "~/services/LogginService";
import { AuthCookie } from "~/models/auth.models";
import { createAdminUser, supabase } from "~/utils/supabase";
import { Fail } from "~/models/FailedValidation";
import { Success } from "~/models/SuccessValidation";
import { User } from "@supabase/supabase-js";

//export let AuthContext: ContextId<string>;
 
export const useLogin = routeAction$(async (data, requestEvent) => {
  /*
  const baseUrl = requestEvent.env.get("BASE_URL") ? requestEvent.env.get("BASE_URL") : "http://backend:5026";
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if(response.status !== 200)
  {
    return requestEvent.fail(response.status, response.text());
  }
  const cookie = getCookieFromHeaders(response.headers)
  if(!cookie){
    return {
      success: false,
    }
  }
  //AuthContext= createContextId(`auth_${access_token}`);
  requestEvent.cookie.set("access_token", cookie.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  log(`User ${data.email} logged in: [TOKEN]: ${cookie.access_token}`);
  return {
    token: cookie.access_token,
    user: data.email,
    success: cookie.access_token ? true : false,
  };
  */
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
  throw requestEvent.redirect(302, "/");
},
zod$(loginRequestSchema));

export default component$(() => {
  const states = useStore({
    data: { email: "", password: "" } as LoginInput,
  });
  const location = useLocation();

  const loginAction = useLogin();

  if(loginAction.value?.failed){
    console.log(loginAction.value);
  }

  return (
    <div class="flex items-start justify-center min-h-[70vh] w-full p-3 ">
      <Form action={loginAction} class="flex w-[90%] mt-10 flex-col border-2 border-black p-5 gap-3">
      <h1 class="block text-center font-bold text-3xl">Login</h1>
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          class="border border-gray-500 pl-1"
          onInput$={(event) =>
            (states.data.email = (event.target as HTMLInputElement).value)
          }
        />
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          class="border border-gray-500 pl-1"
          onInput$={(event) =>
            (states.data.password = (event.target as HTMLInputElement).value)
          }
        />
        <button type="submit" class="bg-green-500">
          Log in
        </button>
        <button onClick$={() => {
          const user = createAdminUser();
          console.log(user);
        }}type="button" class="bg-red-500">create admin user</button>
      </Form>
    </div>
  );
});

const getCookieFromHeaders = (headers: Headers): AuthCookie | null => {
  try{
    const cookieHeader= headers.get("set-cookie");
    if(!cookieHeader)
    {
      return null;
    }
    const tokenPart = cookieHeader.split(";")[0];
    const access_token = tokenPart.split("=")[1]
    const authCookie: AuthCookie = {
        access_token: access_token,
        sameSite: "strict",
        secure: true,
        httpOnly: true
    }
    return authCookie;
  }catch(error)
  {
    console.error("Unable to get cookie from headers:\n", error);
    return null;
  }
}
