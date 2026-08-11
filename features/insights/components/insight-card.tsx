import {
  Sparkles,
  AlertCircle,
  Zap,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  generateInsight,
} from "../actions";



export async function InsightCard() {


  let insight = {

    title:
      "Stay consistent with your learning",

    insight:
      "Focus on completing your roadmap steps and maintaining regular study sessions.",

    priority:
      "MEDIUM",

  };



  try {


    const response =
      await generateInsight();



    if(response){

      insight = {

        title:
          response.title ||
          insight.title,


        insight:
          response.insight ||
          insight.insight,


        priority:
          response.priority ||
          insight.priority,

      };

    }



  } catch(error) {


    console.error(
      "Insight generation failed:",
      error
    );


  }





  const priorityStyle =
    insight.priority === "HIGH"

      ? "border-red-500/40 text-red-500"

      : insight.priority === "MEDIUM"

        ? "border-yellow-500/40 text-yellow-500"

        : "border-green-500/40 text-green-500";





  return (

    <Card className="overflow-hidden">


      <CardHeader className="border-b">


        <CardTitle className="flex items-center gap-2">


          <Sparkles
            className="h-5 w-5"
          />


          AI Learning Insight


        </CardTitle>


      </CardHeader>





      <CardContent className="space-y-5 p-6">


        <div className="rounded-xl bg-muted p-5">


          <h3 className="text-xl font-semibold">

            {insight.title}

          </h3>


          <p className="mt-3 leading-7 text-muted-foreground">

            {insight.insight}

          </p>


        </div>







        <div className="flex items-center gap-3">


          {
            insight.priority === "HIGH"

            ? (

              <AlertCircle
                className="h-5 w-5"
              />

            )

            : (

              <Zap
                className="h-5 w-5"
              />

            )

          }




          <span
            className={`
              rounded-full border px-4 py-1 text-xs font-medium
              ${priorityStyle}
            `}
          >

            Priority: {insight.priority}

          </span>


        </div>



      </CardContent>


    </Card>

  );

}