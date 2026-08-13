import "dotenv/config";

import { WebSocketServer } from "ws";
import {
  GoogleGenAI,
  Modality,
} from "@google/genai";


const PORT =
  Number(process.env.PORT) || 8000;


const ai =
  new GoogleGenAI({
    apiKey:
      process.env.GEMINI_API_KEY!,
  });



const wss =
  new WebSocketServer({
    port: PORT,
  });



console.log(
  `Voice server running on ${PORT}`,
);



wss.on(
  "connection",
  async (ws) => {


    console.log(
      "Client connected",
    );


    let session:
      Awaited<
        ReturnType<
          typeof ai.live.connect
        >
      > | null = null;



    try {


      session =
        await ai.live.connect({

          model:
            process.env.GEMINI_LIVE_MODEL ??
            "gemini-live-2.5-flash-preview",


          config: {

            responseModalities: [
              Modality.AUDIO,
            ],

          },



          callbacks: {


            onopen() {

              console.log(
                "Gemini Live connected",
              );

            },



            onmessage(message) {


              if (
                ws.readyState === ws.OPEN
              ) {


                ws.send(
                  JSON.stringify(
                    message,
                  ),
                );


              }

            },



            onerror(error) {

              console.error(
                "Gemini error",
                error,
              );

            },



            onclose() {

              console.log(
                "Gemini Live closed",
              );

            },


          },


        });





      ws.on(
        "message",
        (data) => {


          try {


            const message =
              JSON.parse(
                data.toString(),
              );



            session?.sendRealtimeInput(
              message,
            );



          } catch(error) {


            console.error(
              "Message error",
              error,
            );


          }


        },
      );





      ws.on(
        "close",
        () => {


          console.log(
            "Client disconnected",
          );



          session?.close?.();



        },
      );




    } catch(error) {


      console.error(
        "Gemini session failed",
        error,
      );


      ws.close();


    }


  },
);