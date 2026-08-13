export type Project = {
  id: string;

  title: string;

  description: string | null;

  skills: string[];

  status: string;

  category: string;

  githubUrl: string | null;

  demoUrl: string | null;

  imageUrl?: string | null;
};