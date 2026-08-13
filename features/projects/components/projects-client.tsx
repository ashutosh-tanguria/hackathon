"use client";


import {
  useState,
} from "react";


import {
  ProjectCard,
} from "./project-card";


import {
  ProjectForm,
} from "./project-form";


import type {
  Project,
} from "../types";




export function ProjectsClient({

  initialProjects,

}: {

  initialProjects: Project[];

}) {


  const [editingProject, setEditingProject] =
    useState<Project | null>(null);




  function handleEdit(
    project: Project
  ) {

    setEditingProject(project);


    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  }




  return (

    <div className="space-y-8">


      <ProjectForm

        editingProject={
          editingProject
        }

        setEditingProject={
          setEditingProject
        }

      />




      <div className="space-y-5">


        <h2 className="text-2xl font-semibold">
          Your Projects
        </h2>




        {
          initialProjects.length === 0 ? (

            <div className="rounded-xl border p-6 text-muted-foreground">

              No projects added yet.
              Start building something.

            </div>


          ) : (


            <div className="grid gap-6 md:grid-cols-2">


              {
                initialProjects.map(
                  (project) => (

                    <ProjectCard

                      key={
                        project.id
                      }

                      project={
                        project
                      }

                      onEdit={
                        handleEdit
                      }

                    />

                  )
                )
              }


            </div>


          )
        }



      </div>


    </div>

  );

}