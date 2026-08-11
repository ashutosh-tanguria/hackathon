import {
  GoogleGenerativeAI,
} from "@google/generative-ai";


const apiKey =
  process.env.GEMINI_API_KEY;


if(!apiKey){
  throw new Error(
    "Missing GEMINI_API_KEY"
  );
}



const genAI =
  new GoogleGenerativeAI(
    apiKey,
  );



const model =
  genAI.getGenerativeModel({

    model:
      "gemini-2.5-flash",

  });





export async function generateVoiceSummary(
  transcript:string,
){

  const prompt = `

Summarize this AI mentor conversation.

Keep it short and useful.

Conversation:

${transcript}

Return only the summary text.

`;



  const result =
    await model.generateContent(
      prompt,
    );


  return result.response.text();

}