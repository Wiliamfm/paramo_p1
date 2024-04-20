import type { RequestHandler } from "@builder.io/qwik-city";


export const onRequest: RequestHandler = async (requestEvent) => {
  console.log("\n\nREQUEST:\n");
  const token = getTokenFromHeader(requestEvent.headers.get('Authorization') || '') ?? requestEvent.cookie.get('access_token')?.value;
  if(token){
    console.log("\n\nToken: \”", token)
    requestEvent.headers.set("Authorization", `Bearer ${token}`);;
  }
}

const getTokenFromHeader = (authHeader: string): string | null => {
  //TODO: This is wortless cause we are just getting the token from cookies.
  const parts = authHeader.split(" ");
  if(parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  return null;
}
