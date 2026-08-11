"use client";


import {
  Clock,
  Play,
  Pause,
  Square,
} from "lucide-react";


import {
  useState,
} from "react";


import {
  toast,
} from "sonner";


import {
  Button,
} from "@/components/ui/button";


import {
  Input,
} from "@/components/ui/input";


import {
  useActiveLearningSession,
  useStartLearningSession,
  usePauseLearningSession,
  useResumeLearningSession,
  useEndLearningSession,
} from "../hooks";


import {
  SessionTimer,
} from "./session-timer";





export function SessionCard(){


const {
 data:session,
 isLoading,
}=useActiveLearningSession();



const start =
useStartLearningSession();



const pause =
usePauseLearningSession();



const resume =
useResumeLearningSession();



const end =
useEndLearningSession();




const [title,setTitle] =
useState("");





async function handleStart(){


if(!title.trim()){

toast.error(
"Enter session title"
);

return;

}



try{

await start.mutateAsync(title);

toast.success(
"Study session started"
);

setTitle("");

}catch{

toast.error(
"Failed to start session"
);

}


}






async function handlePause(){

if(!session)
return;


await pause.mutateAsync(
session.id
);


toast.success(
"Session paused"
);

}







async function handleResume(){

if(!session)
return;


await resume.mutateAsync(
session.id
);


toast.success(
"Session resumed"
);

}







async function handleEnd(){

if(!session)
return;


await end.mutateAsync(
session.id
);


toast.success(
"Session completed"
);

}






if(isLoading){

return (

<div className="rounded-xl border p-6">

Loading...

</div>

);

}






return (

<div className="space-y-6 rounded-2xl border p-6">


<div className="flex items-center gap-3">


<Clock
className="h-7 w-7"
/>


<h2 className="text-2xl font-bold">

Study Session

</h2>


</div>





{
!session && (

<div className="space-y-4">


<Input

placeholder="What are you studying?"

value={title}

onChange={(e)=>
setTitle(e.target.value)
}

/>


<Button

className="w-full"

onClick={handleStart}

disabled={
start.isPending
}

>

<Play className="mr-2 h-4 w-4"/>


{
start.isPending
?"Starting..."
:"Start Focus Session"
}


</Button>


</div>

)
}






{
session && (

<>


<div className="rounded-xl bg-muted p-4">


<h3 className="font-semibold">

{session.title}

</h3>


<p className="mt-1 text-sm text-muted-foreground">

Status: {session.status}

</p>


</div>




<SessionTimer

startedAt={
session.startedAt
}

isRunning={
session.status==="ACTIVE"
}

/>





<div className="flex gap-3">


{
session.status==="ACTIVE" && (

<Button
className="flex-1"
onClick={handlePause}
>

<Pause className="mr-2 h-4 w-4"/>

Pause

</Button>

)
}





{
session.status==="PAUSED" && (

<Button
className="flex-1"
onClick={handleResume}
>

<Play className="mr-2 h-4 w-4"/>

Resume

</Button>

)

}




<Button

variant="destructive"

className="flex-1"

onClick={handleEnd}

>

<Square className="mr-2 h-4 w-4"/>

End

</Button>


</div>



</>

)
}



</div>

);


}