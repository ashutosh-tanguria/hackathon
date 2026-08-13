import {
  getProjects,
} from "@/features/projects/actions";


import {
  ProjectsClient,
} from "@/features/projects/components/projects-client";



export default async function ProjectsPage() {


  const projects =
    await getProjects();



  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold">
          Projects
        </h1>


        <p className="mt-2 text-muted-foreground">
          Track your builds, experiments, and portfolio projects.
        </p>


      </div>



      <ProjectsClient
        initialProjects={projects}
      />


    </div>

  );

}