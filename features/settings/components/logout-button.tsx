"use client";


import {
LogOut,
} from "lucide-react";


import {
Button,
} from "@/components/ui/button";


import {
authClient,
} from "@/lib/auth-client";



export function LogoutButton(){


async function handleLogout(){

await authClient.signOut();


window.location.href =
"/sign-in";


}



return (

<Button

variant="outline"

onClick={handleLogout}

className="gap-2"

>

<LogOut
className="h-4 w-4"
/>

Logout

</Button>

);


}