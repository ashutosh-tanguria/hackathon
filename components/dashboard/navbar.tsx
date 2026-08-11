"use client";


import {
  usePathname,
} from "next/navigation";


import {
  Sparkles,
} from "lucide-react";



const pageNames: Record<string,string> = {

  "/dashboard":"Dashboard",

  "/goals":"Goals",

  "/assessment":"Assessment",

  "/roadmap":"Roadmap",

  "/sessions":"Study Sessions",

  "/analytics":"Analytics",

  "/reflection":"Reflection",

  "/practice":"Practice",

  "/projects":"Projects",

  "/companion":"AI Companion",

  "/voice":"Voice Companion",

  "/settings":"Settings",

};





export function Navbar(){


  const pathname =
    usePathname();



  const title =
    pageNames[pathname] ?? "StudyOS";



  return (

    <header className="flex h-16 items-center justify-between border-b px-6">


      <div>


        <h2 className="text-xl font-semibold">

          {title}

        </h2>


        <p className="text-xs text-muted-foreground">

          Personalized AI learning workspace

        </p>


      </div>





      <div className="flex items-center gap-3 rounded-full border px-4 py-2">


        <Sparkles
          className="h-4 w-4"
        />


        <span className="text-sm font-medium">

          StudyOS AI

        </span>


      </div>



    </header>

  );

}