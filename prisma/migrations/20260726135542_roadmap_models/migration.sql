/*
  Warnings:

  - You are about to drop the column `order` on the `RoadmapNode` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `RoadmapNode` table. All the data in the column will be lost.
  - Added the required column `estimatedWeeks` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `RoadmapNode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `RoadmapNode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week` to the `RoadmapNode` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `RoadmapNode` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "estimatedWeeks" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RoadmapNode" DROP COLUMN "order",
DROP COLUMN "status",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL,
ADD COLUMN     "week" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
