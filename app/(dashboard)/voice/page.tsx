import {
  Mic,
  Sparkles,
  Brain,
} from "lucide-react";


import {
  VoiceCompanion,
} from "@/features/voice/components/voice-companion";



export default function VoicePage() {

  return (

    <main className="container mx-auto max-w-5xl space-y-8 py-8">


      <section>


        <div className="flex items-center gap-3">


          <Mic
            className="h-10 w-10"
          />


          <h1 className="text-4xl font-bold">
            Voice Companion
          </h1>


        </div>



        <p className="mt-3 text-muted-foreground max-w-2xl">

          Talk naturally with your AI learning mentor.
          Discuss goals, ask doubts and get personalized guidance.

        </p>


      </section>






      <section className="grid gap-5 md:grid-cols-3">



        <div className="rounded-xl border p-5">


          <div className="flex items-center gap-2 font-semibold">

            <Sparkles className="h-5 w-5"/>

            AI Mentor

          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            Personalized conversations based on your learning journey.

          </p>


        </div>






        <div className="rounded-xl border p-5">


          <div className="flex items-center gap-2 font-semibold">

            <Brain className="h-5 w-5"/>

            Smart Guidance

          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            Get study strategies and improvement suggestions.

          </p>


        </div>






        <div className="rounded-xl border p-5">


          <div className="font-semibold">

            Real-Time Voice

          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            Natural voice interaction powered by Gemini Live.

          </p>


        </div>


      </section>






      <section className="rounded-2xl border p-3">


        <VoiceCompanion />


      </section>



    </main>

  );

}