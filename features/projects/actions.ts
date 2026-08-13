"use server";


import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import {
  projectSchema,
} from "./schema";





export async function createProject(
  data: unknown
) {


  const user =
    await getCurrentUser();


  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }



  const validated =
    projectSchema.parse(data);




  return prisma.project.create({

    data: {

      title:
        validated.title,


      description:
        validated.description || null,


      skills:
        validated.skills,


      status:
        validated.status,


      category:
        validated.category,


      githubUrl:
        validated.githubUrl || null,


      demoUrl:
        validated.demoUrl || null,


      imageUrl:
        validated.imageUrl || null,


      userId:
        user.id,

    },

  });

}







export async function getProjects() {


  const user =
    await getCurrentUser();



  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }




  return prisma.project.findMany({

    where: {

      userId:
        user.id,

    },


    orderBy: {

      createdAt:
        "desc",

    },

  });

}







export async function updateProject(
  id: string,
  data: unknown
) {


  const user =
    await getCurrentUser();



  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }




  const validated =
    projectSchema.parse(data);





  return prisma.project.update({

    where: {

      id,

    },


    data: {

      title:
        validated.title,


      description:
        validated.description || null,


      skills:
        validated.skills,


      status:
        validated.status,


      category:
        validated.category,


      githubUrl:
        validated.githubUrl || null,


      demoUrl:
        validated.demoUrl || null,


      imageUrl:
        validated.imageUrl || null,

    },

  });

}







export async function deleteProject(
  id: string
) {


  const user =
    await getCurrentUser();



  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }




  const project =
    await prisma.project.findFirst({

      where: {

        id,

        userId:
          user.id,

      },

    });




  if (!project) {

    throw new Error(
      "Project not found"
    );

  }





  return prisma.project.delete({

    where: {

      id,

    },

  });

}