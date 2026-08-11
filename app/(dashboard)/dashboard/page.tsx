import Link from "next/link";

import {
Target,
Brain,
BookOpen,
ArrowRight,
Sparkles,
Plus,
Mic,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import { DashboardGoals } from "@/features/goals/components/dashboard-goals";
import { InsightCard } from "@/features/insights/components/insight-card";

import {
Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";



export default async function DashboardPage() {


const user =
await getCurrentUser();



if(!user){

return (
<div>
Unauthorized
</div>
);

}





const [
roadmap,
reflectionCount,
sessionCount,
goalsCount,
] =
await Promise.all([


prisma.roadmap.findFirst({

where:{
goal:{
userId:user.id,
},
},


include:{

goal:true,

nodes:{
orderBy:{
position:"asc",
},
},

},


orderBy:{
createdAt:"desc",
},

}),



prisma.reflectionSession.count({

where:{
userId:user.id,
},

}),



prisma.learningSession.count({

where:{
userId:user.id,
},

}),



prisma.goal.count({

where:{
userId:user.id,
},

}),


]);





const completed =
roadmap?.nodes.filter(
node=>node.completed
).length ?? 0;



const total =
roadmap?.nodes.length ?? 0;



const progress =
total === 0
? 0
: Math.round(
(completed / total) * 100
);



const nextNode =
roadmap?.nodes.find(
node=>!node.completed
);





return (

<main className="space-y-10">



<section>

<div className="flex items-center justify-between">


<div>

<h1 className="text-4xl font-bold">

Welcome back, {user.name ?? "Student"} 👋

</h1>


<p className="mt-2 text-muted-foreground">

Your AI powered learning workspace.

</p>

</div>



<Link href="/goals">

<Button>

<Plus className="mr-2 h-4 w-4"/>

New Goal

</Button>

</Link>


</div>

</section>








<section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">



<Card>

<CardHeader>

<CardTitle className="flex items-center gap-2">

<Target className="h-5 w-5"/>

Goals

</CardTitle>

</CardHeader>


<CardContent>

<p className="text-4xl font-bold">
{goalsCount}
</p>

<p className="text-sm text-muted-foreground">
Learning goals
</p>

</CardContent>

</Card>







<Card>

<CardHeader>

<CardTitle className="flex items-center gap-2">

<Brain className="h-5 w-5"/>

Progress

</CardTitle>

</CardHeader>


<CardContent>

<p className="text-4xl font-bold">

{progress}%

</p>


<Progress
value={progress}
className="mt-3"
/>

</CardContent>

</Card>







<Card>

<CardHeader>

<CardTitle className="flex items-center gap-2">

<BookOpen className="h-5 w-5"/>

Sessions

</CardTitle>

</CardHeader>


<CardContent>

<p className="text-4xl font-bold">

{sessionCount}

</p>


<p className="text-sm text-muted-foreground">
Study sessions completed
</p>


</CardContent>

</Card>







<Card>

<CardHeader>

<CardTitle className="flex items-center gap-2">

<Sparkles className="h-5 w-5"/>

Reflections

</CardTitle>

</CardHeader>


<CardContent>

<p className="text-4xl font-bold">

{reflectionCount}

</p>


<p className="text-sm text-muted-foreground">
AI learning reflections
</p>


</CardContent>

</Card>




</section>







<section className="grid gap-6 lg:grid-cols-3">



<Card className="lg:col-span-2">

<CardHeader>

<CardTitle>
Current Goal
</CardTitle>

</CardHeader>


<CardContent>


{
roadmap ? (

<>

<h2 className="text-xl font-semibold">

{roadmap.goal.title}

</h2>


<p className="mt-2 text-muted-foreground">

{roadmap.goal.description}

</p>

</>


) : (

<p className="text-muted-foreground">

Create your first goal to start your AI learning journey.

</p>

)

}


</CardContent>

</Card>







<Card>

<CardHeader>

<CardTitle>
AI Actions
</CardTitle>

</CardHeader>


<CardContent className="space-y-3">


<Link href="/assessment">

<Button variant="outline" className="w-full">

<Brain className="mr-2 h-4 w-4"/>

Take Assessment

</Button>

</Link>



<Link href="/voice">

<Button variant="outline" className="w-full">

<Mic className="mr-2 h-4 w-4"/>

Talk to AI

</Button>

</Link>


</CardContent>

</Card>



</section>







<Card>

<CardHeader>

<CardTitle>
Next Learning Step
</CardTitle>

</CardHeader>


<CardContent>


{
nextNode ? (

<>

<p className="text-sm text-muted-foreground">

Week {nextNode.week}

</p>


<h3 className="mt-2 text-xl font-semibold">

{nextNode.title}

</h3>


<p className="mt-2 text-muted-foreground">

{nextNode.description}

</p>


<Link href="/roadmap">

<Button className="mt-5">

Continue Learning

<ArrowRight className="ml-2 h-4 w-4"/>

</Button>

</Link>


</>


) : (

<p>
🎉 Roadmap completed
</p>

)

}


</CardContent>


</Card>






<InsightCard />



<DashboardGoals />



</main>

);

}