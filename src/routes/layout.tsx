import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";

export const head: DocumentHead = {
  title: "Paramo Presenta",
};

export const onGet: RequestHandler = async ({ cacheControl, ...requestEvent }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useLogin = routeLoader$(async requestEvent => {
  const token = getTokenFromHeader(requestEvent.request.headers.get('Authorization') || '') ?? requestEvent.cookie.get('access_token')?.value;
  if(token){
    return true;
  }
  return false;
});

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {

  return (
    <div class="flex flex-col dark:bg-black h-screen w-screen overflow-y-scroll">
      <Header />
      <main>
        <div class="">
          <Slot />
        </div>
      </main>
      <Footer class=""/>
    </div>
  );
});

const getTokenFromHeader = (authHeader: string): string | null => {
  //TODO: This is wortless cause we are just getting the token from cookies.
  const parts = authHeader.split(" ");
  if(parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  return null;
}
