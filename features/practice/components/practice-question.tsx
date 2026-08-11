"use client";


import {
  useState,
} from "react";


import {
  Button,
} from "@/components/ui/button";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



interface PracticeQuestionProps {

  question: string;

  options: string[];

  onSubmit: (
    answer: string
  ) => void;

  disabled?: boolean;

}





export function PracticeQuestion({

  question,

  options,

  onSubmit,

  disabled,

}: PracticeQuestionProps) {


  const [selected, setSelected] =
    useState("");




  function handleSubmit(){

    if(!selected) return;


    onSubmit(selected);

  }





  return (

    <Card>


      <CardHeader>

        <CardTitle>

          {question}

        </CardTitle>

      </CardHeader>




      <CardContent className="space-y-4">


        <div className="space-y-2">


          {
            options.map(
              (option)=>(
                
                <button

                  key={option}

                  type="button"

                  onClick={()=>
                    setSelected(option)
                  }

                  disabled={disabled}

                  className={`
                    w-full rounded-lg border p-3 text-left transition
                    ${
                      selected === option
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted"
                    }
                  `}

                >

                  {option}

                </button>

              )
            )
          }


        </div>





        <Button

          onClick={handleSubmit}

          disabled={
            disabled ||
            !selected
          }

          className="w-full"

        >

          Submit Answer

        </Button>



      </CardContent>


    </Card>

  );

}