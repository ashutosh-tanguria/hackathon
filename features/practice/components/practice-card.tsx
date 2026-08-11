"use client";


import {
  useState,
} from "react";


import {
  Sparkles,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  PracticeQuestion as PracticeQuestionType,
  PracticeResult as PracticeResultType,
} from "../types";

import {
  useCreatePractice,
  useSubmitPractice,
} from "../hooks";


import {
  PracticeQuestion,
} from "./practice-question";


import {
  PracticeResult,
} from "./practice-result";





interface PracticeCardProps {

  goal: string;

}





export function PracticeCard({

  goal,

}: PracticeCardProps) {



  const createPractice =
    useCreatePractice();



  const submitPractice =
    useSubmitPractice();




  const [questions,setQuestions] =
useState<PracticeQuestionType[]>([]);



  const [current,setCurrent] =
    useState(0);



  const [answers,setAnswers] =
    useState<string[]>([]);



  const [result,setResult] =
useState<PracticeResultType | null>(null);






  async function generate(){


    const data =
      await createPractice.mutateAsync(
        goal
      );



    setQuestions(
      data.questions ?? []
    );


    setCurrent(0);

    setAnswers([]);

    setResult(null);


  }







  async function handleAnswer(
    answer:string
  ){


    const updated = [
      ...answers,
      answer,
    ];



    setAnswers(updated);





    if(current + 1 < questions.length){


      setCurrent(
        current + 1
      );


    }
    else{


      const evaluation =
        await submitPractice.mutateAsync({

          questions,

          answers: updated,

        });



      setResult(
        evaluation
      );


    }


  }








  if(result){


    return (

      <PracticeResult
        result={result}
      />

    );


  }






  return (

    <Card>


      <CardHeader>


        <CardTitle className="flex items-center gap-2">


          <Sparkles
            className="h-5 w-5"
          />


          AI Practice


        </CardTitle>


      </CardHeader>





      <CardContent className="space-y-6">



        {
          questions.length === 0 ? (


            <Button

              onClick={generate}

              disabled={
                createPractice.isPending
              }

              className="w-full"

            >


              {
                createPractice.isPending

                ? "Generating..."

                : "Generate Practice"

              }


            </Button>


          )

          :

          (

            <>


              <p className="text-sm text-muted-foreground">

                Question {current + 1} / {questions.length}

              </p>





              <PracticeQuestion


                question={
                  questions[current].question
                }


                options={
                  questions[current].options
                }


                onSubmit={
                  handleAnswer
                }


                disabled={
                  submitPractice.isPending
                }


              />


            </>

          )

        }



      </CardContent>


    </Card>

  );

}