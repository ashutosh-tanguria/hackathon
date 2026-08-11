"use client";


import Link from "next/link";

import {
  Trash2,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";

import {
  toast,
} from "sonner";


import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";


import {
  useDeleteGoal,
} from "../hooks";


import {
  Goal,
} from "../types";





interface GoalCardProps {

  goal: Goal;

}





export function GoalCard({
  goal,
}:GoalCardProps){



  const deleteGoal =
    useDeleteGoal();





  async function handleDelete(){


    try{


      await deleteGoal.mutateAsync(
        goal.id
      );


      toast.success(
        "Goal deleted successfully."
      );


    }catch{


      toast.error(
        "Failed to delete goal."
      );


    }

  }







  return (

    <Card className="group transition hover:-translate-y-1 hover:shadow-lg">


      <CardContent className="space-y-5 p-6">



        <div className="flex items-start justify-between">


          <div className="space-y-3">


            <div className="flex items-center gap-2">


              <Target
                className="h-5 w-5"
              />


              <h3 className="text-xl font-semibold">

                {goal.title}

              </h3>


            </div>





            <div className="flex gap-2">


              <Badge>

                {goal.category}

              </Badge>


              <Badge variant="outline">

                AI Guided

              </Badge>


            </div>


          </div>





          <Button

            size="icon"

            variant="ghost"

            onClick={handleDelete}

            disabled={
              deleteGoal.isPending
            }

          >

            <Trash2
              className="h-4 w-4 text-muted-foreground"
            />


          </Button>


        </div>







        <p className="text-sm text-muted-foreground">


          {
            goal.description ||
            "No description added. Start assessment to personalize your learning path."
          }


        </p>







        <div className="rounded-lg bg-muted p-3 text-sm">


          <div className="flex items-center gap-2 font-medium">


            <Sparkles
              className="h-4 w-4"
            />


            Next Step


          </div>


          <p className="mt-1 text-muted-foreground">

            Analyze your current skill level and generate roadmap.

          </p>


        </div>







        <Link
          href={`/assessment?goalId=${goal.id}`}
        >

          <Button
            className="w-full"
          >

            <Brain
              className="mr-2 h-4 w-4"
            />

            Start AI Assessment

          </Button>


        </Link>




      </CardContent>


    </Card>

  );

}