import { RequestHandler } from "@builder.io/qwik-city";
import { supabase } from "~/utils/supabase";


export const onRequest: RequestHandler = async requestEvent => {
  const session = await supabase.auth.getSession();
  if(session.error || session.data.session == null){
    requestEvent.status(401);
    throw requestEvent.redirect(302, "/login");
  }
}
