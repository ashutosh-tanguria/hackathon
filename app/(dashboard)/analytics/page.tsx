import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default async function AnalyticsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const roadmap =
    await prisma.roadmap.findFirst({
      where: {
        goal: {
          userId: user.id,
        },
      },

      include: {
        goal: true,

        nodes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const reflectionCount =
    await prisma.reflectionSession.count({
      where: {
        userId: user.id,
      },
    });

  const sessionCount =
    await prisma.learningSession.count({
      where: {
        userId: user.id,
      },
    });

  const sessions =
    await prisma.learningSession.findMany({
      where: {
        userId: user.id,
        status: "COMPLETED",
      },
    });

  const totalStudyMinutes =
    sessions.reduce(
      (sum, session) =>
        sum + (session.duration ?? 0),
      0
    );

  const averageDuration =
    sessionCount === 0
      ? 0
      : Math.round(
          totalStudyMinutes /
            sessionCount
        );

  const completed =
    roadmap?.nodes.filter(
      (node) => node.completed
    ).length ?? 0;

  const total =
    roadmap?.nodes.length ?? 0;

  const progress =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor your learning progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardHeader>
            <CardTitle>
              Roadmap Progress
            </CardTitle>
          </CardHeader>

          <CardContent>

            <Progress value={progress} />

            <p className="mt-4 text-sm">
              {completed} / {total} completed
            </p>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Study Sessions
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-4xl font-bold">
              {sessionCount}
            </p>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Study Time
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-4xl font-bold">
              {totalStudyMinutes}
            </p>

            <p className="text-sm text-muted-foreground">
              minutes
            </p>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Reflections
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-4xl font-bold">
              {reflectionCount}
            </p>

          </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <Card>

          <CardHeader>
            <CardTitle>
              Current Goal
            </CardTitle>
          </CardHeader>

          <CardContent>

            <h2 className="text-xl font-semibold">
              {roadmap?.goal.title ??
                "No Goal"}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {roadmap?.goal
                .description ??
                "Create a goal to start learning."}
            </p>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>
              Session Statistics
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-between">

              <span>
                Average Session
              </span>

              <span className="font-semibold">
                {averageDuration} min
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Total Study Time
              </span>

              <span className="font-semibold">
                {totalStudyMinutes} min
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Reflection Entries
              </span>

              <span className="font-semibold">
                {reflectionCount}
              </span>

            </div>

          </CardContent>

        </Card>

      </div>

      <Link href="/roadmap">
        <Button>
          Continue Learning
        </Button>
      </Link>

    </main>
  );
}