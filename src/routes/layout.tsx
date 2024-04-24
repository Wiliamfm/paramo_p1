import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";
import { supabase } from "~/utils/supabase";
import { log } from "~/services/LogginService";

export const head: DocumentHead = {
  title: "Paramo Presenta",
};

export const useUserLoader = routeLoader$(async () => {
  const session = await supabase.auth.getSession();
  if(session.error || session.data.session == null){
    return null;
  }
  const {data, error} = await supabase.auth.getUser();
  if(error || data.user == null){
    log(`Failed to get user [${error?.status}: code: ${error?.code}]: ${error?.message}`);
    return null;
  }
  return data.user;
});

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
  const currentUser = useUserLoader();

  return (
    <div class="flex flex-col dark:bg-black h-screen w-screen overflow-y-scroll overflow-x-hidden">
      <Header user={currentUser.value} />
      <main>
        <div class="">
          <Slot />
        </div>
      </main>
      <Footer class=""/>
    </div>
  );
});
