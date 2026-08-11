"use client";


import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";





interface ReflectionResultProps {

  result:{
    summary:string;
    strengths:string[];
    improvements:string[];
    nextAction:string;
  };

}





export function ReflectionResult({
  result,
}:ReflectionResultProps){


  return (

    <Card className="mt-8 overflow-hidden">


      <CardHeader className="border-b">


        <CardTitle className="flex items-center gap-2">


          <Sparkles
            className="h-6 w-6"
          />


          AI Reflection Report


        </CardTitle>


      </CardHeader>






      <CardContent className="space-y-6 p-6">



        <div className="rounded-xl bg-muted p-5">


          <h3 className="font-semibold">

            Learning Summary

          </h3>


          <p className="mt-2 text-muted-foreground">

            {result.summary}

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




            <div className="space-y-3">


              {
                result.strengths.map(
                  (item)=>(
                    
                    <div
                      key={item}
                      className="rounded-lg bg-muted p-3 text-sm"
                    >

                      {item}

                    </div>

                  )
                )
              }


            </div>


          </div>







          <div className="rounded-xl border p-5">


            <div className="mb-4 flex items-center gap-2">


              <TrendingUp
                className="h-5 w-5 text-blue-500"
              />


              <h3 className="font-semibold">

                Improvement Areas

              </h3>


            </div>




            <div className="space-y-3">


              {
                result.improvements.map(
                  (item)=>(
                    
                    <div
                      key={item}
                      className="rounded-lg bg-muted p-3 text-sm"
                    >

                      {item}

                    </div>

                  )
                )
              }


            </div>


          </div>



        </div>







        <div className="rounded-xl border p-5">


          <div className="flex items-center gap-2 font-semibold">


            <ArrowRight
              className="h-5 w-5"
            />


            Recommended Next Action


          </div>




          <p className="mt-3 text-muted-foreground">

            {result.nextAction}

          </p>



        </div>




      </CardContent>


    </Card>

  );

}