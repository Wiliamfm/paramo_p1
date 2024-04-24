import { component$ } from "@builder.io/qwik";
import ImgBack from "../../../../public/images/hoja.png?jsx";
import { Form } from "@builder.io/qwik-city";
import { createAdminUser } from "~/utils/supabase";




export const LoginForm = component$(({states, loginAction}:{states:any, loginAction:any}) => {
  
  return (
    <div class="relative flex items-center justify-center w-[90%] max-w-[400px] min-h-[400px] transform-all overflow-hidden   animate-slideIn  lg:w-full  ">
      <div class="absolute -top-2 right-0 w-1/2 dark:border-white">
        <ImgBack alt="hoja" class="rotate-[230deg]"/>
      </div>
      <div class="absolute top-0 left-0 w-1/4 h-1/4 border-l border-t border-black dark:border-white"></div>
      <div class="absolute top-0 right-0 w-1/4 h-1/4 border-r border-t border-black dark:border-white"></div>
      <div class="absolute bottom-0 left-0 w-1/4 h-1/4 border-l border-b border-black dark:border-white"></div>
      <div class="absolute bottom-0 right-0 w-1/4 h-1/4 border-r border-b border-black dark:border-white"></div>

      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[95%]  h-[95%]  justify-center items-center  z-20 ">
        <Form
          action={loginAction}
          class="flex w-full h-full flex-col px-4 justify-center items-center gap-3 "
        >
          <h1 class="block text-center font-bold text-3xl  mb-10">Inicia sesion</h1>
          <label for="email" class="w-full ">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            class="border border-gray-400 bg-gray-100 px-2 py-1 w-full text-black rounded-xl"
            onInput$={(event) =>
              (states.data.email = (event.target as HTMLInputElement).value)
            }
          />
          <label for="password" class="w-full">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            class="border border-gray-400 bg-gray-100 pl-1 w-full text-black px-2 py-1 rounded-xl"
            onInput$={(event) =>
              (states.data.password = (event.target as HTMLInputElement).value)
            }
          />
          <button type="submit" class="w-full bg-[#0056b3] text-white">
            Log in
          </button>
          <button
            onClick$={() => {
              const user = createAdminUser();
              console.log("\nAdmin user created: \n", user);
            }}
            type="button"
            class="w-full bg-red-700 text-white"
          >
            create admin user
          </button>
        </Form>
      </div>
    </div>
  );
});
