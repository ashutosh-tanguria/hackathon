import {
  PracticeCard,
} from "@/features/practice/components/practice-card";


import {
  Card,
  CardContent,
} from "@/components/ui/card";


import {
  prisma,
} from "@/lib/prisma";


import {
  getCurrentUser,
} from "@/lib/current-user";





export default async function PracticePage(){



  const user =
    await getCurrentUser();




  if(!user){

    return (

      <div>
        Unauthorized
      </div>

    );

  }






  const goal =
    await prisma.goal.findFirst({

      where: {

        userId:
          user.id,

      },


      orderBy: {

        createdAt:
          "desc",

      },

    });






  return (

    <main className="space-y-8">


      <section>


        <h1 className="text-4xl font-bold">

          AI Practice

        </h1>



        <p className="mt-2 text-muted-foreground">

          Test your understanding with personalized AI generated questions.

        </p>


      </section>







      {
        goal ? (

          <PracticeCard

            goal={

              `
              ${goal.title}

              Category:
              ${goal.category}

              Description:
              ${goal.description ?? "None"}
              `

            }

          />

        )

        :

        (

          <Card>


            <CardContent className="p-8">


              <h2 className="text-xl font-semibold">

                No goal found

              </h2>



              <p className="mt-2 text-muted-foreground">

                Create a learning goal first to start AI practice.

              </p>


            </CardContent>


          </Card>

        )

      }



    </main>

  );

}