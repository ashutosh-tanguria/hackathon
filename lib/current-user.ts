import { getSession } from "./session";


export async function getCurrentUser() {

  const session =
    await getSession();


  return session?.user ?? null;

}