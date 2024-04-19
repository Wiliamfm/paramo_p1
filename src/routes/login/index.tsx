import { $, component$, useStore } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
type LoginType = {
  email: string;
  password: string;
};

export default component$(() => {
  const states = useStore({
    data: { email: "", password: "" } as LoginType,
  });

  const handleOnSubmit = $((event: Event) => {
    console.log(states.data);
  });

  return (
    <div class="flex items-start justify-center min-h-[70vh] w-full p-3 ">
      <Form class="flex w-[90%] mt-10 flex-col border-2 border-black p-5 gap-3" onSubmit$={handleOnSubmit}>
      <h1 class="block text-center font-bold text-3xl">Login</h1>
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
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
          placeholder="Password"
          class="border border-gray-500 pl-1"
          onInput$={(event) =>
            (states.data.password = (event.target as HTMLInputElement).value)
          }
        />
        <button type="submit" class="bg-green-500" onClick$={handleOnSubmit}>
          Log in
        </button>
      </Form>
    </div>
  );
});
