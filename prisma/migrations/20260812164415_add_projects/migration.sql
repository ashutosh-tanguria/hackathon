-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IDEA', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('WEB', 'AI_ML', 'HARDWARE', 'RESEARCH', 'OTHER');

-- DropEnum
DROP TYPE "RoadmapNodeStatus";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "skills" TEXT[],
    "status" "ProjectStatus" NOT NULL DEFAULT 'IDEA',
    "category" "ProjectCategory" NOT NULL DEFAULT 'OTHER',
    "githubUrl" TEXT,
    "demoUrl" TEXT,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
