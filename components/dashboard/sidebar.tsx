"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";


import {
  Home,
  Target,
  Brain,
  Map,
  Clock,
  BarChart3,
  MessageSquare,
  Mic,
  Settings,
  Dumbbell,
  FolderKanban,
  Bot,
} from "lucide-react";



const links = [

  {
    title:"Dashboard",
    href:"/dashboard",
    icon:Home,
  },

  {
    title:"Goals",
    href:"/goals",
    icon:Target,
  },

  {
    title:"Assessment",
    href:"/assessment",
    icon:Brain,
  },

  {
    title:"Roadmap",
    href:"/roadmap",
    icon:Map,
  },

  {
    title:"Study Sessions",
    href:"/sessions",
    icon:Clock,
  },

  {
    title:"Practice",
    href:"/practice",
    icon:Dumbbell,
  },

  {
    title:"Projects",
    href:"/projects",
    icon:FolderKanban,
  },

  {
    title:"Analytics",
    href:"/analytics",
    icon:BarChart3,
  },

  {
    title:"Reflection",
    href:"/reflection",
    icon:MessageSquare,
  },

  {
    title:"AI Companion",
    href:"/companion",
    icon:Bot,
  },

  {
    title:"Voice Companion",
    href:"/voice",
    icon:Mic,
  },

  {
    title:"Settings",
    href:"/settings",
    icon:Settings,
  },

];





export function Sidebar(){

  const pathname =
    usePathname();



  return (

    <aside className="flex w-72 flex-col border-r bg-background">


      <div className="border-b p-6">


        <h1 className="text-2xl font-bold">
          StudyOS
        </h1>


        <p className="mt-1 text-sm text-muted-foreground">
          AI Learning Platform
        </p>


      </div>





      <nav className="flex-1 space-y-1 p-4">


        {
          links.map((link)=>{


            const Icon =
              link.icon;


            const active =
              pathname === link.href;



            return (

              <Link

                key={link.href}

                href={link.href}

                className={`
                  flex items-center gap-3 rounded-lg px-4 py-3
                  transition-all
                  ${
                    active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted"
                  }
                `}

              >

                <Icon
                  className="h-5 w-5"
                />

                <span>
                  {link.title}
                </span>


              </Link>

            );


          })
        }


      </nav>


    </aside>

  );

}