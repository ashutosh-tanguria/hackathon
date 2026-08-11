import {
  Bot,
  Sparkles,
  MessageCircle,
  Brain,
} from "lucide-react";


import { CompanionChat } from "@/features/companion/components/companion-chat";



export default function CompanionPage() {

  return (

    <main className="container mx-auto max-w-6xl space-y-8 py-8">



      <section>


        <div className="flex items-center gap-3">


          <Bot
            className="h-10 w-10"
          />


          <h1 className="text-4xl font-bold">
            AI Companion
          </h1>


        </div>



        <p className="mt-3 max-w-2xl text-muted-foreground">

          Your personal AI learning mentor for planning,
          studying, solving doubts and improving your learning strategy.

        </p>


      </section>







      <section className="grid gap-5 md:grid-cols-3">



        <div className="rounded-xl border p-5">


          <div className="flex items-center gap-2 font-semibold">

            <Sparkles className="h-5 w-5"/>

            Personalized Guidance

          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            AI recommendations based on your goals,
            roadmap and progress.

          </p>


        </div>







        <div className="rounded-xl border p-5">


          <div className="flex items-center gap-2 font-semibold">

            <MessageCircle className="h-5 w-5"/>

            Doubt Solving

          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            Ask questions and get instant explanations
            from your AI mentor.

          </p>


        </div>







        <div className="rounded-xl border p-5">


          <div className="flex items-center gap-2 font-semibold">

            <Brain className="h-5 w-5"/>

            Learning Strategy

          </div>


          <p className="mt-2 text-sm text-muted-foreground">

            Improve your study approach with AI-driven insights.

          </p>


        </div>



      </section>







      <section className="rounded-2xl border p-2">


        <CompanionChat />


      </section>




    </main>

  );

}