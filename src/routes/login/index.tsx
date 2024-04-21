import { component$, useStore } from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import { LoginInput } from "~/models/login";
import { loginRequestSchema } from "~/schemas/login.schema";
import { log } from "~/services/LogginService";
import { Fail } from "~/models/FailedValidation";
import { createAdminUser, supabase } from "~/utils/supabase";

export const useLogin = routeAction$(async (data, requestEvent) => {
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
  const loginAction = useLogin();

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
