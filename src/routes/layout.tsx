import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const onRequestLogin: RequestHandler = async ({next, url}) => {
  console.log('Before request hayout', url);
  await next();
  console.log('After request hayout', url);
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class="dark:bg-black h-screen flex flex-col">
      <Header />
      <main>
        <div class="mt-4 p-4">
          <Slot />
        </div>
      </main>
      <Footer class="mt-auto"/>
    </div>
  );
});
