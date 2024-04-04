import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";
import { SideBarMenu } from "~/components/common/sideBarMenu/sideBarMenu";

export const head: DocumentHead = {
  title: "Paramo Presenta",
};

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

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const showSideBarMenu = useSignal(false);

  const toggleSideBarMenu = $(() => {
    showSideBarMenu.value = !showSideBarMenu.value;
  });

  return (
    <div class="flex">
      {showSideBarMenu.value && <SideBarMenu />}
      <div class="dark:bg-black h-screen flex flex-col">
        <Header toggleSideBarMenu$={toggleSideBarMenu} />
        <main>
          <div class="mt-4 p-4">
            <Slot />
          </div>
        </main>
        <Footer class="mt-auto"/>
      </div>
    </div>
  );
});
