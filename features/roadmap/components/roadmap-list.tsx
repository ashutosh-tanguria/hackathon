"use client";


import { useRouter } from "next/navigation";


import {
  Check,
  Lock,
  Play,
  Sparkles,
} from "lucide-react";


import {
  Progress,
} from "@/components/ui/progress";


import {
  useToggleRoadmapNode,
} from "../hooks";





interface RoadmapNode {

  id:string;

  title:string;

  description:string;

  week:number;

  difficulty:string;

  completed:boolean;

}





interface RoadmapListProps {

  nodes: RoadmapNode[];

}





export function RoadmapList({
  nodes,
}:RoadmapListProps){



const router =
useRouter();



const toggleNode =
useToggleRoadmapNode();





const completed =
nodes.filter(
(node)=>node.completed
).length;




const progress =
nodes.length === 0
? 0
: Math.round(
(completed / nodes.length) * 100
);






async function handleToggle(
id:string,
){

await toggleNode.mutateAsync(
id
);

router.refresh();

}






return (

<div className="space-y-8">





<div className="rounded-2xl border p-6">


<div className="flex items-center justify-between">


<div className="flex items-center gap-2">


<Sparkles
className="h-5 w-5"
/>


<h2 className="font-semibold">

AI Learning Roadmap

</h2>


</div>




<span className="text-sm text-muted-foreground">

{completed}/{nodes.length} completed

</span>


</div>




<Progress
value={progress}
className="mt-4"
/>



<p className="mt-2 text-sm text-muted-foreground">

{progress}% journey completed

</p>


</div>







<div className="space-y-5">


{
nodes.map(
(node,index)=>{


const isCurrent =
!node.completed &&
(
index===0 ||
nodes[index-1]?.completed
);





return (

<div

key={node.id}

className={`
rounded-2xl border p-6 transition
${
node.completed
? "border-green-500/40 bg-green-500/5"
: isCurrent
? "border-primary bg-primary/5 shadow-sm"
: "opacity-70 hover:opacity-100"
}
`}

>



<div className="flex items-start justify-between gap-4">





<div className="flex gap-4">


<button

onClick={()=>
handleToggle(node.id)
}

disabled={
toggleNode.isPending
}

className={`
flex h-9 w-9 items-center justify-center
rounded-full border
${
node.completed
? "bg-green-600 text-white"
: isCurrent
? "bg-primary text-primary-foreground"
: ""
}
`}

>


{
node.completed ? (

<Check className="h-5 w-5"/>

)

:

isCurrent ? (

<Play className="h-4 w-4"/>

)

:

(

<Lock className="h-4 w-4"/>

)

}


</button>







<div>


<div className="flex flex-wrap items-center gap-3">


<h3 className="font-semibold text-lg">

Week {node.week}: {node.title}

</h3>



{
isCurrent && (

<span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">

Current Step

</span>

)

}


</div>



<p className="mt-2 text-sm text-muted-foreground">

{node.description}

</p>


</div>



</div>







<span className="rounded-full border px-3 py-1 text-xs">

{node.difficulty}

</span>



</div>






<div className="mt-5 text-sm">


{
node.completed ? (

<span className="text-green-600">

Completed

</span>

)

:

isCurrent ? (

<span className="text-primary">

Continue this learning step

</span>

)

:

(

<span className="text-muted-foreground">

Locked until previous step completion

</span>

)

}


</div>



</div>


);


}

)
}


</div>



</div>

);

}