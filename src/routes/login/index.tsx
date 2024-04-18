import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$ } from '@builder.io/qwik-city';
import { loginRequestSchema } from '~/schemas/login.schema';
import { TextInput } from '~/components/form/TextInput/text-input';

export const useLogin = routeAction$(async (data, requestEvent) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const body = await response.json();
  console.log(body);
  requestEvent.headers.set("Authorization", `Bearer ${body.message}`);;
  return body;
},
  zod$(loginRequestSchema)
);

export default component$(() => {
  const loginAction = useLogin();
  const email = loginAction.formData?.get("email");
  const password = loginAction.formData?.get("password");

  return (
    <Form action={loginAction} class="max-w-sm mx-auto my-10">
      {loginAction.value?.failed && <p class="text-red-500">{loginAction.value?.fieldErrors?.email ?? loginAction.value?.email}</p>}
      <input placeholder="Ingresa tu email" type="email" name="email"/>
      {loginAction.value?.failed && <p class="text-red-500">{loginAction.value?.fieldErrors?.password ?? loginAction.value?.password}</p>}
      <input placeholder="Ingresa tu pass" type="password" name="password"/>
      <TextInput name="email-2" type="email" value={email} error={loginAction.value?.fieldErrors?.email} label="Email:" placeholder="Ingresa tu email">
        <span class="material-symbols-outlined">
          mail
        </span>
      </TextInput>
      <TextInput name="password-2" type="password" value={password} error={loginAction.value?.fieldErrors?.password} label="Password:"/>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ingresar</button>
    </Form>
  );
});
