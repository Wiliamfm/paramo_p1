import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { log } from "~/services/LogginService";
import { supabase } from "~/utils/supabase";


export const onRequest: RequestHandler = async requestEvent => {
  const { error } = await supabase.auth.signOut();
  log(`User signed out: ${error ? error.message : "Success"}`);
  throw requestEvent.redirect(302, "/");
}

export default component$(() => {
  return <></>;
});
