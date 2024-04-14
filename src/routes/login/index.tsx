import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, validator$, zod$ } from '@builder.io/qwik-city';
import { loginRequestSchema } from '~/schemas/login.schema';
import { LoginValidator } from '~/validators/login.validator';
import { TextInput } from '~/components/form/TextInput/text-input';
import { createJWT } from '~/utils/helpers';

export const useLogin = routeAction$(async (_, requestEvent) => {
  console.log(requestEvent.parseBody());
//    const jwt = await createJWT(body);
//    return {
//      success: true,
//      data: jwt
//    }
//  }
  //const jwt = await createJWT();

  //console.log(jwt)
  return {
    success: true,
    //data: jwt
  }
  //requestEvent.headers.set('Authorization', `Bearer ${token}`);
},
  zod$(loginRequestSchema),
  validator$(LoginValidator)
);

export default component$(() => {
  const loginAction = useLogin();
  const labelClass = "block mb-2 text-sm font-medium dark:text-white";
  const labelErrorClass = labelClass + " text-red-700 dark:text-red-500";
  const inputClass = "text-sm rounded-lg block w-full p-2.5 border border-gray-400 dark:bg-gray-700 dark:text-white dark:placeholder-white";
  const inputErrorClass = inputClass + " bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  console.log(loginAction);
  console.log(loginAction?.value);
  console.log(loginAction?.value?.fieldErrors);

  return (
    <div>
        {false && <div><div data-tf-live="01HV32H5BWZDKVAC6T74SCKKDK"></div><script src="//embed.typeform.com/next/embed.js"></script></div>}
      <Form action={loginAction} class="max-w-sm mx-auto my-10">
        <div class="mb-5">
         <TextInput required={true} name="email" type="email" value={loginAction?.formData?.get("email")} error={loginAction?.value?.fieldErrors?.email?.[0]} label="Email" labelClass={loginAction?.value?.fieldErrors?.email ? labelErrorClass : labelClass} class={loginAction?.value?.fieldErrors?.email ? inputErrorClass : inputClass} />
        </div>
        <div>
          <TextInput required={true} name="password" type="password" value={loginAction?.formData?.get("password")} error={loginAction?.value?.fieldErrors?.password?.[0]} label="Password" labelClass={loginAction?.value?.fieldErrors?.password ? labelErrorClass : labelClass } class={loginAction?.value?.fieldErrors?.password ? inputErrorClass : inputClass} />
        </div>
        <button type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </Form>
    </div>
  );
});
