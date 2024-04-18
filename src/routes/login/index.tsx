import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$ } from '@builder.io/qwik-city';
import { loginRequestSchema } from '~/schemas/login.schema';
import { createJWT } from '~/utils/helpers';
import { login } from '~/services/AuthAppService';
import { UserResponse } from '~/models/Response/login.model';
import { log } from '~/services/LogginService';
import { TextInput } from '~/components/form/TextInput/text-input';

export const useLogin = routeAction$(async (data, requestEvent) => {
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

  log(`User ${user.email} logged in: ${jwt}`);
  requestEvent.cookie.set("access_token", jwt, {
    httpOnly: true,
    secure: true,
  });
  requestEvent.json(200, {
    access_token: jwt,
  });
},
  zod$(loginRequestSchema)
);

  {/*
  <div class="w-full">
        <div data-tf-live="01HVP5JQJAQV43656VTFHQWPDB"></div><script src="//embed.typeform.com/next/embed.js"></script>
    </div>
  */}
export default component$(() => {

  return (
    <Form class="max-w-sm mx-auto my-10">
      <TextInput name="email" type="email" value="" error="" label="Email:">
        <span class="material-symbols-outlined">
          mail
        </span>
      </TextInput>
      <TextInput name="password" type="password" value="" error="" label="Password:"/>
    </Form>
  );
});
