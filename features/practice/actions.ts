"use server";


import {
getCurrentUser,
} from "@/lib/current-user";

import {
  PracticeQuestion,
} from "./types";

import {
generatePracticeQuestions,
evaluatePractice,
} from "./service";



export async function createPractice(
goal:string
){


const user =
await getCurrentUser();



if(!user){

throw new Error(
"Unauthorized"
);

}



return generatePracticeQuestions(
goal
);


}




export async function submitPractice(

data:{
  questions: PracticeQuestion[];
  answers: string[];
}

){


const user =
await getCurrentUser();



if(!user){

throw new Error(
"Unauthorized"
);

}



return evaluatePractice(
data
);


}