import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";


export async function GET() {

  const user =
    await getCurrentUser();


  if (!user) {
    return NextResponse.json(
      {
        goals: [],
        reflections: [],
      }
    );
  }


  const goals =
    await prisma.goal.findMany({
      where:{
        userId:user.id,
      },
      orderBy:{
        createdAt:"desc",
      },
      take:5,
    });



  const reflections =
    await prisma.reflectionSession.findMany({
      where:{
        userId:user.id,
      },
      orderBy:{
        createdAt:"desc",
      },
      take:5,
    });



  return NextResponse.json({
    goals,
    reflections,
  });

}