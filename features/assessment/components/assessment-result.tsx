"use client";


import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  Badge,
} from "@/components/ui/badge";





interface AssessmentResultProps {

  result:{
    level:string;
    strengths:string[];
    weaknesses:string[];
  };

}





export function AssessmentResult({
  result,
}:AssessmentResultProps){


  return (

    <Card className="mt-8 overflow-hidden">


      <CardHeader className="border-b">


        <div className="flex items-center justify-between">


          <CardTitle className="flex items-center gap-2">


            <Brain
              className="h-6 w-6"
            />


            AI Skill Assessment


          </CardTitle>




          <Badge className="px-4 py-1 text-sm">

            {result.level}

          </Badge>



        </div>


      </CardHeader>






      <CardContent className="space-y-6 p-6">



        <div className="rounded-xl bg-muted p-4">


          <div className="flex items-center gap-2 font-semibold">


            <Sparkles
              className="h-5 w-5"
            />


            AI Analysis


          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            Based on your responses, StudyOS identified your
            current learning level and improvement areas.

          </p>


        </div>







        <div className="grid gap-6 md:grid-cols-2">



          <div className="rounded-xl border p-5">


            <div className="mb-4 flex items-center gap-2">


              <CheckCircle2
                className="h-5 w-5 text-green-500"
              />


              <h3 className="font-semibold">

                Strengths

              </h3>


            </div>




            <ul className="space-y-3">


              {
                result.strengths.map(
                  (item)=>(
                    
                    <li
                      key={item}
                      className="rounded-lg bg-muted p-3 text-sm"
                    >

                      {item}

                    </li>

                  )
                )
              }


            </ul>


          </div>







          <div className="rounded-xl border p-5">


            <div className="mb-4 flex items-center gap-2">


              <AlertTriangle
                className="h-5 w-5 text-yellow-500"
              />


              <h3 className="font-semibold">

                Improvement Areas

              </h3>


            </div>





            <ul className="space-y-3">


              {
                result.weaknesses.map(
                  (item)=>(
                    
                    <li
                      key={item}
                      className="rounded-lg bg-muted p-3 text-sm"
                    >

                      {item}

                    </li>

                  )
                )
              }


            </ul>


          </div>



        </div>




      </CardContent>


    </Card>

  );

}