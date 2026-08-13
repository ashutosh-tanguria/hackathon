import {
  ExternalLink,
  Code2,
  Trash2,
  Pencil,
} from "lucide-react";


import {
  deleteProject,
} from "../actions";


import type {
  Project,
} from "../types";





type ProjectCardProps = {

  project: Project;

  onEdit: (
    project: Project
  ) => void;

};





export function ProjectCard({

  project,

  onEdit,

}: ProjectCardProps) {



  async function handleDelete() {

    const confirmed =
      confirm(
        "Delete this project?"
      );


    if (!confirmed) return;


    await deleteProject(
      project.id
    );


    window.location.reload();

  }





  return (

    <div className="rounded-xl border bg-card p-6 space-y-5">


      <div className="flex items-start justify-between">


        <div>

          <h3 className="text-xl font-semibold">
            {project.title}
          </h3>


          <p className="text-sm text-muted-foreground">
            {project.category}
          </p>


        </div>


        <span className="rounded-full border px-3 py-1 text-xs">
          {project.status}
        </span>


      </div>





      {
        project.description && (

          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

        )
      }




      <div className="flex flex-wrap gap-2">

        {
          project.skills.map(
            (skill) => (

              <span
                key={skill}
                className="rounded-md bg-muted px-2 py-1 text-xs"
              >
                {skill}
              </span>

            )
          )
        }

      </div>





      <div className="flex items-center gap-4">


        {
          project.githubUrl && (

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline"
            >

              <Code2 size={16}/>

              Code

            </a>

          )
        }





        {
          project.demoUrl && (

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline"
            >

              <ExternalLink size={16}/>

              Demo

            </a>

          )
        }





        <button
          onClick={() => onEdit(project)}
          className="flex items-center gap-2 text-sm hover:underline"
        >

          <Pencil size={16}/>

          Edit

        </button>





        <button
          onClick={handleDelete}
          className="ml-auto flex items-center gap-2 text-sm text-red-500 hover:underline"
        >

          <Trash2 size={16}/>

          Delete

        </button>


      </div>



    </div>

  );

}