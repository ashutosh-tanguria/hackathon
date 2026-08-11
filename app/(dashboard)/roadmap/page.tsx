import { Sparkles } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  RoadmapList,
} from "@/features/roadmap/components/roadmap-list";



export default async function RoadmapPage() {

  const user =
    await getCurrentUser();


  if(!user){

    return (
      <div>
        Unauthorized
      </div>
    );

  }



  const roadmap =
    await prisma.roadmap.findFirst({

      where:{

        goal:{

          userId:user.id,

        },

      },


      include:{

        goal:true,


        nodes:{

          orderBy:{

            position:"asc",

          },

        },

      },


      orderBy:{

        createdAt:"desc",

      },

    });





  if(!roadmap){

    return (

      <Card>

        <CardContent className="p-8">

          <h2 className="text-2xl font-bold">
            No roadmap yet
          </h2>


          <p className="mt-2 text-muted-foreground">
            Complete assessment to generate your AI roadmap.
          </p>


        </CardContent>

      </Card>

    );

  }






  return (

    <main className="space-y-8">


      <section>


        <div className="flex items-center gap-3">


          <Sparkles
            className="h-8 w-8"
          />


          <h1 className="text-4xl font-bold">
            {roadmap.title}
          </h1>


        </div>



        <p className="mt-3 text-muted-foreground">

          Goal: {roadmap.goal.title}

        </p>



        <p className="mt-1 text-sm text-muted-foreground">

          {roadmap.estimatedWeeks} week personalized learning roadmap

        </p>


      </section>





      <RoadmapList
        nodes={roadmap.nodes}
      />



    </main>

  );

}