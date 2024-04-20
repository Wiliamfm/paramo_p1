import { ContextId, component$, createContextId, useStore } from "@builder.io/qwik";
import { isBrowser } from '@builder.io/qwik/build';
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import { LoginInput } from "~/models/login";
import { loginRequestSchema } from "~/schemas/login.schema";
import { log } from "~/services/LogginService";

export const useLogin = routeAction$(async (data, requestEvent) => {
  const response = await fetch(`${requestEvent.env.get("BASE_API_URL")}/login`, {
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
  const access_token = getCookieFromHeaders(response.headers)
  if(!access_token){
    return {
      success: false,
    }
  }
  log(`User ${data.email} logged in: [TOKEN]: ${access_token}`);
  return {
    token: access_token,
    user: data.email,
    success: access_token ? true : false,
  };
},
zod$(loginRequestSchema));

export default component$(() => {
  const states = useStore({
    data: { email: "", password: "" } as LoginInput,
  });
  const loginAction = useLogin();

  if(loginAction.value?.success)
  {
    if(isBrowser){
      document.cookie = `access_token=${loginAction.value.token}`
    }
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
      </Form>
    </div>
  );
});

const getCookieFromHeaders = (headers: Headers): string | null => {
  try{
    const cookieHeader= headers.get("set-cookie");
    if(!cookieHeader)
    {
      return null;
    }
    const cookie = cookieHeader.split(";")[0];
    const token = cookie.split("=")[1];
    return token;
  }catch(error)
  {
    console.error("Unable to get cookie from headers:\n", error);
    return null;
  }
}
