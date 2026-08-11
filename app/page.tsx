import Link from "next/link";
import {
  Brain,
  Map,
  Mic,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react";


export default function HomePage() {

  return (

    <main className="min-h-screen bg-background">


      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">


        <div className="mb-6 flex items-center gap-2 rounded-full border px-4 py-2 text-sm">

          <Sparkles className="h-4 w-4" />

          AI Powered Learning OS

        </div>



        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">

          Learn Smarter with your
          <span className="text-primary">
            {" "}Personal AI Mentor
          </span>

        </h1>



        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">

          StudyOS creates personalized learning roadmaps,
          analyzes your progress, helps you reflect,
          and guides your journey with AI.

        </p>





        <div className="mt-10 flex gap-4">


          <Link

            href="/sign-up"

            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"

          >

            Start Learning

          </Link>



          <Link

            href="/sign-in"

            className="rounded-lg border px-6 py-3 font-medium"

          >

            Sign In

          </Link>


        </div>



      </section>







      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">



        <FeatureCard

          icon={<Target className="h-6 w-6" />}

          title="Personal Goals"

          description="Define your learning goals and let AI understand your objectives."

        />



        <FeatureCard

          icon={<Map className="h-6 w-6" />}

          title="AI Roadmaps"

          description="Get structured learning paths generated according to your level."

        />



        <FeatureCard

          icon={<Brain className="h-6 w-6" />}

          title="Smart Assessment"

          description="Analyze your skills and identify improvement areas."

        />



        <FeatureCard

          icon={<Mic className="h-6 w-6" />}

          title="Voice Companion"

          description="Talk naturally with your AI learning mentor."

        />



        <FeatureCard

          icon={<BarChart3 className="h-6 w-6" />}

          title="Analytics"

          description="Track progress, consistency and learning growth."

        />



        <FeatureCard

          icon={<Sparkles className="h-6 w-6" />}

          title="AI Insights"

          description="Receive personalized recommendations to improve faster."

        />



      </section>



    </main>

  );

}





function FeatureCard({

  icon,

  title,

  description,

}: {

  icon: React.ReactNode;

  title: string;

  description: string;

}) {

  return (

    <div className="rounded-2xl border p-6 transition hover:bg-muted/40">


      <div className="mb-4">

        {icon}

      </div>


      <h3 className="text-xl font-semibold">

        {title}

      </h3>


      <p className="mt-2 text-sm text-muted-foreground">

        {description}

      </p>


    </div>

  );

}