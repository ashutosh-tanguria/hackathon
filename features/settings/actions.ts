"use server";


import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";


export async function updateProfileName(
  name:string
){

const user =
await getCurrentUser();


if(!user){
  throw new Error("Unauthorized");
}


await prisma.user.update({

where:{
  id:user.id,
},

data:{
  name,
},

});


return true;

}