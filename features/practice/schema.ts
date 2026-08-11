import { z } from "zod";


export const practiceQuestionSchema =
z.object({

questions:
z.array(

z.object({

question:
z.string(),

options:
z.array(z.string()),

})

),

});



export const practiceResultSchema =
z.object({

score:
z.number(),

strengths:
z.array(z.string()),

improvements:
z.array(z.string()),

feedback:
z.string(),

});