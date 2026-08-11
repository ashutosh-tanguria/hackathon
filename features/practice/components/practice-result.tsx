"use client";


import {
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



interface PracticeResultProps {

  result: {

    score: number;

    strengths: string[];

    improvements: string[];

    feedback: string;

  };

}




export function PracticeResult({

  result,

}: PracticeResultProps) {


  return (

    <Card className="mt-6">


      <CardHeader>


        <CardTitle>

          Practice Evaluation

        </CardTitle>


      </CardHeader>




      <CardContent className="space-y-6">


        <div className="rounded-xl border p-5 text-center">


          <p className="text-sm text-muted-foreground">

            Score

          </p>


          <p className="mt-2 text-5xl font-bold">

            {result.score}%

          </p>


        </div>







        <div>


          <h3 className="mb-3 flex items-center gap-2 font-semibold">

            <CheckCircle2
              className="h-5 w-5"
            />

            Strengths

          </h3>




          <ul className="list-disc space-y-2 pl-5">


            {
              result.strengths.map(
                (item)=>(
                  
                  <li key={item}>

                    {item}

                  </li>

                )
              )
            }


          </ul>


        </div>








        <div>


          <h3 className="mb-3 flex items-center gap-2 font-semibold">


            <AlertTriangle
              className="h-5 w-5"
            />


            Improvements


          </h3>





          <ul className="list-disc space-y-2 pl-5">


            {
              result.improvements.map(
                (item)=>(
                  
                  <li key={item}>

                    {item}

                  </li>

                )
              )
            }


          </ul>


        </div>








        <div className="rounded-xl bg-muted p-5">


          <h3 className="mb-2 flex items-center gap-2 font-semibold">


            <TrendingUp
              className="h-5 w-5"
            />


            Feedback


          </h3>



          <p className="leading-7 text-muted-foreground">

            {result.feedback}

          </p>


        </div>



      </CardContent>


    </Card>

  );

}