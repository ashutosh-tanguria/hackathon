"use client";


import {
  Target,
  Sparkles,
} from "lucide-react";


import { GoalGrid } from "./goal-grid";
import { CreateGoalDialog } from "./create-goal-dialog";


import {
  useCreateGoal,
  useGoals,
} from "../hooks";



export function DashboardGoals() {


  const {
    data: goals = [],
    isLoading,
  } = useGoals();



  const createGoal =
    useCreateGoal();





  if(isLoading){

    return (

      <div className="rounded-xl border p-6">

        <p className="text-muted-foreground">
          Loading your learning goals...
        </p>

      </div>

    );

  }






  return (

    <section className="space-y-6">



      <div className="flex items-center justify-between">


        <div>


          <div className="flex items-center gap-2">


            <Target
              className="h-6 w-6"
            />


            <h2 className="text-2xl font-bold">

              Your Learning Goals

            </h2>


          </div>



          <p className="mt-1 text-sm text-muted-foreground">

            Define what you want to learn and let StudyOS
            create your personalized path.

          </p>


        </div>





        <CreateGoalDialog

          onSubmit={async(values)=>{

            await createGoal.mutateAsync(
              values
            );

          }}

        />



      </div>







      {
        goals.length === 0 ? (


          <div className="rounded-xl border p-8 text-center">


            <Sparkles
              className="mx-auto h-10 w-10"
            />


            <h3 className="mt-4 text-xl font-semibold">

              Start your learning journey

            </h3>



            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">

              Create your first goal and StudyOS will
              analyze your level, generate a roadmap,
              and guide your progress.

            </p>



          </div>



        ) : (


          <GoalGrid
            goals={goals}
          />


        )
      }




    </section>

  );

}