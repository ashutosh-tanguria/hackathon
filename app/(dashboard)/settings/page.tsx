import {
  Settings,
  User,
  Shield,
  Palette,
  LogOut,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/current-user";



export default async function SettingsPage(){


  const user =
    await getCurrentUser();



  if(!user){

    return (
      <div>
        Unauthorized
      </div>
    );

  }





  return (

    <main className="space-y-8">



      <section>


        <div className="flex items-center gap-3">

          <Settings
            className="h-8 w-8"
          />


          <h1 className="text-4xl font-bold">
            Settings
          </h1>


        </div>


        <p className="mt-2 text-muted-foreground">
          Manage your StudyOS preferences.
        </p>


      </section>







      <section className="grid gap-6 md:grid-cols-2">



        <Card>


          <CardHeader>


            <CardTitle className="flex items-center gap-2">

              <User className="h-5 w-5"/>

              Account

            </CardTitle>


          </CardHeader>



          <CardContent className="space-y-3">


            <div>

              <p className="text-sm text-muted-foreground">
                Name
              </p>


              <p className="font-medium">
                {user.name ?? "Student"}
              </p>

            </div>




            <div>

              <p className="text-sm text-muted-foreground">
                Email
              </p>


              <p className="font-medium">
                {user.email}
              </p>

            </div>


          </CardContent>


        </Card>








        <Card>


          <CardHeader>


            <CardTitle className="flex items-center gap-2">

              <Palette className="h-5 w-5"/>

              Appearance

            </CardTitle>


          </CardHeader>



          <CardContent>


            <p className="text-muted-foreground">

              Theme customization is available through your
              dashboard preferences.

            </p>



          </CardContent>


        </Card>








        <Card>


          <CardHeader>


            <CardTitle className="flex items-center gap-2">

              <Shield className="h-5 w-5"/>

              Privacy

            </CardTitle>


          </CardHeader>



          <CardContent>


            <p className="text-muted-foreground">

              Your learning data is securely stored and used
              only for personalized AI recommendations.

            </p>


          </CardContent>


        </Card>








        <Card>


          <CardHeader>


            <CardTitle className="flex items-center gap-2">

              <LogOut className="h-5 w-5"/>

              Session

            </CardTitle>


          </CardHeader>



          <CardContent>


            <Button
              variant="outline"
              disabled
            >

              Logout

            </Button>


          </CardContent>


        </Card>



      </section>


    </main>

  );

}