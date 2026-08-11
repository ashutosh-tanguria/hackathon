"use client";


import {
  Timer,
  Play,
} from "lucide-react";


import {
  useEffect,
  useState,
} from "react";



interface SessionTimerProps {

  startedAt: Date | string;

  isRunning: boolean;

}



export function SessionTimer({
  startedAt,
  isRunning,
}: SessionTimerProps){


  const [seconds,setSeconds] =
    useState(0);



  useEffect(()=>{


    if(!isRunning)
      return;



    const start =
      new Date(startedAt).getTime();



    const update = ()=>{

      setSeconds(
        Math.floor(
          (Date.now()-start)/1000
        )
      );

    };



    update();



    const interval =
      setInterval(
        update,
        1000
      );



    return ()=>clearInterval(interval);



  },[
    startedAt,
    isRunning,
  ]);





  const hours =
    Math.floor(seconds/3600);



  const minutes =
    Math.floor(
      (seconds%3600)/60
    );



  const secs =
    seconds%60;



  return (

    <div className="rounded-2xl border p-6 text-center">


      <div className="flex items-center justify-center gap-2">


        {
          isRunning ? (

            <Play className="h-5 w-5"/>

          ) : (

            <Timer className="h-5 w-5"/>

          )
        }


        <h2 className="font-semibold">

          Focus Timer

        </h2>


      </div>





      <div className="mt-6 text-6xl font-bold tracking-wider tabular-nums">


        {String(hours).padStart(2,"0")}:
        {String(minutes).padStart(2,"0")}:
        {String(secs).padStart(2,"0")}


      </div>





      <p className="mt-4 text-sm text-muted-foreground">


        {
          isRunning
          ? "Deep focus session active"
          : "Session paused"
        }


      </p>


    </div>

  );

}