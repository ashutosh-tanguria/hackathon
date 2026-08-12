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
function cleanJson(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}
export async function generatePracticeQuestions(
  goal: string
) {


  try {


    const result =
      await gemini.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  PRACTICE_SYSTEM_PROMPT +
                  "\n" +
                  `
Goal:

${goal}

Generate 5 practice questions.

`,
              },
            ],
          },
        ],

      });


    const text =
      result.text;


    if (!text) {
      throw new Error(
        "Empty Gemini response"
      );
    }


    return practiceQuestionSchema.parse(
      JSON.parse(cleanJson(text))
    );



  } catch (error) {


    console.error(
      "Practice generation failed",
      error
    );



    return {

      questions: [],


    };


  }


}





export async function evaluatePractice(

  data: {
    questions: PracticeQuestion[];
    answers: string[];
  }

) {


  try {


    const result =
      await gemini.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  EVALUATION_SYSTEM_PROMPT +
                  "\n" +
                  `
Questions:

${JSON.stringify(data.questions)}

Answers:

${JSON.stringify(data.answers)}

Evaluate performance.

`,
              },
            ],
          },
        ],

      });


    const text =
      result.text;


    if (!text) {
      throw new Error(
        "Empty Gemini response"
      );
    }


    return practiceResultSchema.parse(
      JSON.parse(cleanJson(text))
    );





  } catch (error) {


    console.error(
      "Practice evaluation failed",
      error
    );



    return {

      score: 0,

      strengths: [
        "Keep practicing."
      ],

      improvements: [
        "Review fundamentals."
      ],

      feedback:
        "Unable to generate AI feedback currently."

    };


  }


}