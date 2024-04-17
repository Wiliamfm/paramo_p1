import { component$ } from '@builder.io/qwik';
import { routeAction$, zod$ } from '@builder.io/qwik-city';
import { loginRequestSchema } from '~/schemas/login.schema';
import { createJWT } from '~/utils/helpers';
import { login } from '~/services/AuthAppService';
import { UserResponse } from '~/models/Response/login.model';
import { log } from '~/services/LogginService';

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

export default component$(() => {

  return (
    <div class="w-full">
        <div data-tf-live="01HVP5JQJAQV43656VTFHQWPDB"></div><script src="//embed.typeform.com/next/embed.js"></script>
    </div>
  );
});
