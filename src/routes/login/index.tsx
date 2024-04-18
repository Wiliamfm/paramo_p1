import { component$, useSignal } from '@builder.io/qwik';
import { Form, routeAction$, routeLoader$, zod$ } from '@builder.io/qwik-city';
import { loginRequestSchema } from '~/schemas/login.schema';
import { createJWT } from '~/utils/helpers';
import { login } from '~/services/AuthAppService';
import { UserResponse } from '~/models/Response/login.model';
import { log } from '~/services/LogginService';
import { TextInput } from '~/components/form/TextInput/text-input';

export const useLogin = routeAction$(async (data, requestEvent) => {
  /*
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const body = await response.json();
  console.log(body);
  requestEvent.headers.set("Authorization", `Bearer ${body.message}`);;
  */

  const response = await login(data);
  if(!response.success){
    return requestEvent.fail(response.status, response.error);
  }

  const user : UserResponse = {
    id: response.data.id,
    email: response.data.email,
    name: response.data.name,
    created_at: response.data.created_at
  }
  const jwt = await createJWT(user);

  console.log("\n\nLOGIN:\n");
  log(`User ${user.email} logged in: ${jwt}`);
  //requestEvent.headers.set("Authorization", `Bearer ${jwt}`);;
  requestEvent.cookie.set("access_token", jwt, {
    httpOnly: true,
    secure: true,
  });
  console.log("\n\nLOGIN:\n");
  requestEvent.json(200, {
    access_token: jwt,
  });
},
  zod$(loginRequestSchema)
);

export default component$(() => {
  const loginAction = useLogin();
  const labelClass = "block mb-2 text-sm font-medium dark:text-white";
  const labelErrorClass = labelClass + " text-red-700 dark:text-red-500";
  const inputClass = "text-sm rounded-lg block w-full p-2.5 border border-gray-400 dark:bg-gray-700 dark:text-white dark:placeholder-white";
  const inputErrorClass = inputClass + " bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

  return (
    <div class="w-full">
        {/* <div data-tf-live="01HVP5JQJAQV43656VTFHQWPDB"></div><script src="//embed.typeform.com/next/embed.js"></script> */}
    </div>
  */}
export default component$(() => {
  const loginAction = useLogin();
  const email = loginAction.formData?.get("email");
  const password = loginAction.formData?.get("password");
  //console.log(loginAction.value);

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
