import { component$, useContext, useStore } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async (requestEvent) => {
  console.log("\n\nADMIN:\n");
  console.log(requestEvent);
  await requestEvent.next();
  console.log("\n\nADMIN - NEXT:\n");
  console.log(requestEvent.cookie.get("access_token")?.value);
}

export default component$(() => {
  const currentUser = useStore({
    logged: false,
    roles: [],
    token: "",
    name: "",
  });


  return (
    <div>
      New route works.
    </div>
  );
});
