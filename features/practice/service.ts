import {
gemini,
} from "@/lib/gemini";


import {
practiceQuestionSchema,
practiceResultSchema,
} from "./schema";


import {
PRACTICE_SYSTEM_PROMPT,
EVALUATION_SYSTEM_PROMPT,
} from "./prompts";


import {
  PracticeQuestion,
} from "./types";

export async function generatePracticeQuestions(
goal:string
){


try{


const result =
await gemini.generateContent([


PRACTICE_SYSTEM_PROMPT,


`

Goal:

${goal}


Generate 5 practice questions.

`

]);



return practiceQuestionSchema.parse(

JSON.parse(
result.response.text()
)

);



}catch(error){


console.error(
"Practice generation failed",
error
);



return {

questions:[],


};


}


}





export async function evaluatePractice(

data:{
  questions: PracticeQuestion[];
  answers: string[];
}

){


try{


const result =
await gemini.generateContent([


EVALUATION_SYSTEM_PROMPT,


`

Questions:

${JSON.stringify(data.questions)}


Answers:

${JSON.stringify(data.answers)}


Evaluate performance.

`

]);




return practiceResultSchema.parse(

JSON.parse(
result.response.text()
)

);



}catch(error){


console.error(
"Practice evaluation failed",
error
);



return {

score:0,

strengths:[
"Keep practicing."
],

improvements:[
"Review fundamentals."
],

feedback:
"Unable to generate AI feedback currently."

};


}


}