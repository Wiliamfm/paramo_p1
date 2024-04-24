import { RequestHandler } from "@builder.io/qwik-city";
import { supabase } from "~/utils/supabase";


export const onRequest: RequestHandler = async requestEvent => {
  const {data, error} = await supabase.auth.getUser();
  if(error || data.user == null){
    requestEvent.status(401);
    throw requestEvent.redirect(302, "/login");
  }
}
