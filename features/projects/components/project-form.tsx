"use client";


import {
  useState,
} from "react";


import {
  createProject,
  updateProject,
} from "../actions";


import type {
  Project,
} from "../types";




export function ProjectForm({

  editingProject,

  setEditingProject,

}: {

  editingProject: Project | null;

  setEditingProject: (
    project: Project | null
  ) => void;

}) {



  const [loading, setLoading] =
    useState(false);



  const [skills, setSkills] =
    useState(
      editingProject?.skills.join(", ") ?? ""
    );



  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {


    e.preventDefault();


    setLoading(true);



    const form =
      new FormData(
        e.currentTarget
      );



    const data = {

      title:
        String(form.get("title") ?? ""),


      description:
        String(form.get("description") ?? ""),


      skills:
        skills
          .split(",")
          .map(
            (skill) => skill.trim()
          )
          .filter(Boolean),


      category:
        String(form.get("category") ?? "OTHER"),


      status:
        String(form.get("status") ?? "IDEA"),


      githubUrl:
        String(form.get("githubUrl") ?? "") || null,


      demoUrl:
        String(form.get("demoUrl") ?? "") || null,


      imageUrl:
        String(form.get("imageUrl") ?? "") || null,

    };




    try {


      if (editingProject) {


        await updateProject(
          editingProject.id,
          data
        );


      } else {


        await createProject(
          data
        );


      }



      setEditingProject(null);

      window.location.reload();



    } catch(error) {


      console.error(
        "Project save failed:",
        error
      );


    } finally {


      setLoading(false);


    }


  }





  return (

    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 space-y-5"
    >


      <h2 className="text-xl font-semibold">

        {
          editingProject
          ? "Edit Project"
          : "Add New Project"
        }

      </h2>




      <input

        name="title"

        defaultValue={
          editingProject?.title ?? ""
        }

        placeholder="Project Name"

        required

        className="w-full rounded-lg border p-3"

      />





      <textarea

        name="description"

        defaultValue={
          editingProject?.description ?? ""
        }

        placeholder="Project Description"

        rows={4}

        className="w-full rounded-lg border p-3"

      />





      <input

        value={skills}

        onChange={
          (e) =>
            setSkills(e.target.value)
        }

        placeholder="Skills (React, Next.js, AI)"

        className="w-full rounded-lg border p-3"

      />





      <div className="grid gap-4 md:grid-cols-2">


        <select

          name="category"

          defaultValue={
            editingProject?.category ?? "WEB"
          }

          className="rounded-lg border p-3"

        >

          <option value="WEB">
            Web
          </option>

          <option value="AI_ML">
            AI / ML
          </option>

          <option value="HARDWARE">
            Hardware
          </option>

          <option value="RESEARCH">
            Research
          </option>

          <option value="OTHER">
            Other
          </option>


        </select>




        <select

          name="status"

          defaultValue={
            editingProject?.status ?? "IDEA"
          }

          className="rounded-lg border p-3"

        >

          <option value="IDEA">
            Idea
          </option>


          <option value="IN_PROGRESS">
            In Progress
          </option>


          <option value="COMPLETED">
            Completed
          </option>


        </select>


      </div>





      <input

        name="githubUrl"

        defaultValue={
          editingProject?.githubUrl ?? ""
        }

        placeholder="GitHub URL"

        className="w-full rounded-lg border p-3"

      />





      <input

        name="demoUrl"

        defaultValue={
          editingProject?.demoUrl ?? ""
        }

        placeholder="Demo URL"

        className="w-full rounded-lg border p-3"

      />





      <input

        name="imageUrl"

        defaultValue={
          editingProject?.imageUrl ?? ""
        }

        placeholder="Image URL"

        className="w-full rounded-lg border p-3"

      />





      <div className="flex gap-3">


        <button

          disabled={loading}

          className="rounded-lg bg-primary px-5 py-3 text-primary-foreground"

        >

          {
            loading
            ? "Saving..."
            : editingProject
              ? "Update Project"
              : "Add Project"
          }

        </button>





        {
          editingProject && (

            <button

              type="button"

              onClick={() =>
                setEditingProject(null)
              }

              className="rounded-lg border px-5 py-3"

            >

              Cancel

            </button>

          )
        }


      </div>


    </form>

  );

}