import { $, QRL, component$, useStore } from "@builder.io/qwik";

import { Action, Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import { createAdminUser, supabase } from "~/utils/supabase";




export const LoginForm = component$(({states, loginAction}:{states:any, loginAction:any}) => {
  
  return (
    <div class="relative flex items-center justify-center max-w-[400px] h-[400px] w-full  overflow-hidden">
      
      <div class="flex w-[99%] h-[99%] justify-center items-center bg-white z-20 ">
        <Form
          action={loginAction}
          class="flex bg-gray-100 w-[98%] h-[98%] flex-col p-5 gap-3 "
        >
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
          <button
            onClick$={() => {
              const user = createAdminUser();
              console.log(user);
            }}
            type="button"
            class="bg-red-500"
          >
            create admin user
          </button>
        </Form>
      </div>
    </div>
  );
});
