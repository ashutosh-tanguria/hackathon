import {
  Clock,
  Brain,
  Target,
  Flame,
  Sparkles,
} from "lucide-react";


import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InsightCard } from "@/features/insights/components/insight-card";



export default async function AnalyticsPage(){


  const user =
    await getCurrentUser();



  if(!user){

    return (
      <div>
        Unauthorized
      </div>
    );

  }





  const [

    sessions,

    reflections,

    completedNodes,

    totalMinutes,

  ] =
  await Promise.all([



    prisma.learningSession.count({

      where:{
        userId:user.id,
      },

    }),




    prisma.reflectionSession.count({

      where:{
        userId:user.id,
      },

    }),





    prisma.roadmapNode.count({

      where:{
        completed:true,

      },

    }),





    prisma.learningSession.findMany({

      where:{

        userId:user.id,

        status:"COMPLETED",

      },


      select:{

        duration:true,

      },

    }),



  ]);





  const studyMinutes =
    totalMinutes.reduce(
      (sum,item)=>
        sum + (item.duration ?? 0),
      0,
    );







  return (

    <main className="space-y-10">


      <section>


        <div className="flex items-center gap-3">

          <Sparkles
            className="h-8 w-8"
          />

          <h1 className="text-4xl font-bold">
            Learning Analytics
          </h1>


        </div>


        <p className="mt-2 text-muted-foreground">

          Track your progress and learning consistency.

        </p>


      </section>







      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">



        <Card>

          <CardHeader>

            <CardTitle className="flex gap-2 items-center">

              <Clock className="h-5 w-5"/>

              Study Time

            </CardTitle>

          </CardHeader>


          <CardContent>

            <p className="text-4xl font-bold">

              {studyMinutes}

            </p>


            <p className="text-sm text-muted-foreground">
              Minutes completed
            </p>


          </CardContent>


        </Card>







        <Card>

          <CardHeader>

            <CardTitle className="flex gap-2 items-center">

              <Brain className="h-5 w-5"/>

              Sessions

            </CardTitle>


          </CardHeader>


          <CardContent>

            <p className="text-4xl font-bold">

              {sessions}

            </p>


            <p className="text-sm text-muted-foreground">
              Learning sessions
            </p>


          </CardContent>


        </Card>








        <Card>

          <CardHeader>

            <CardTitle className="flex gap-2 items-center">

              <Target className="h-5 w-5"/>

              Milestones

            </CardTitle>


          </CardHeader>


          <CardContent>

            <p className="text-4xl font-bold">

              {completedNodes}

            </p>


            <p className="text-sm text-muted-foreground">
              Roadmap steps done
            </p>


          </CardContent>


        </Card>







        <Card>

          <CardHeader>

            <CardTitle className="flex gap-2 items-center">

              <Flame className="h-5 w-5"/>

              Reflections

            </CardTitle>


          </CardHeader>


          <CardContent>

            <p className="text-4xl font-bold">

              {reflections}

            </p>


            <p className="text-sm text-muted-foreground">
              AI reflections
            </p>


          </CardContent>


        </Card>



      </section>






      <InsightCard />




      <Card>


        <CardHeader>

          <CardTitle>
            Learning Summary
          </CardTitle>


        </CardHeader>


        <CardContent>


          <p className="leading-7 text-muted-foreground">

            StudyOS continuously analyzes your goals,
            roadmap completion, study sessions and reflections
            to provide personalized learning guidance.

          </p>


        </CardContent>


      </Card>




    </main>

  );

}