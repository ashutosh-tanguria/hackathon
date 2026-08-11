import {
  FolderKanban,
  Sparkles,
  Rocket,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



export default function ProjectsPage() {

  return (

    <main className="space-y-8 p-6">


      <section>


        <div className="flex items-center gap-3">

          <FolderKanban
            className="h-8 w-8"
          />


          <h1 className="text-4xl font-bold">
            Projects
          </h1>


        </div>


        <p className="mt-2 text-muted-foreground">
          Build practical projects and track your learning outcomes.
        </p>


      </section>






      <section className="grid gap-6 md:grid-cols-3">



        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Rocket className="h-5 w-5"/>

              Project Based Learning

            </CardTitle>

          </CardHeader>


          <CardContent>

            <p className="text-sm text-muted-foreground">

              Convert your roadmap knowledge into real-world implementations.

            </p>


          </CardContent>


        </Card>






        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Sparkles className="h-5 w-5"/>

              AI Suggestions

            </CardTitle>

          </CardHeader>


          <CardContent>

            <p className="text-sm text-muted-foreground">

              Get ideas based on your goals and current learning progress.

            </p>


          </CardContent>


        </Card>






        <Card>

          <CardHeader>

            <CardTitle>
              Portfolio Ready
            </CardTitle>

          </CardHeader>


          <CardContent>

            <p className="text-sm text-muted-foreground">

              Track projects that showcase your skills and growth.

            </p>


          </CardContent>


        </Card>



      </section>






      <Card>

        <CardHeader>

          <CardTitle>
            Your Projects
          </CardTitle>

        </CardHeader>


        <CardContent>


          <p className="text-muted-foreground">

            Project tracking will appear here as you add learning projects.

          </p>


        </CardContent>


      </Card>



    </main>

  );

}