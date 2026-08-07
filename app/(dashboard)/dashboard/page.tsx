import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import { DashboardGoals } from "@/features/goals/components/dashboard-goals";
import { InsightCard } from "@/features/insights/components/insight-card";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default async function DashboardPage() {
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

        nodes: {
          orderBy: {
            position: "asc",
          },
        },
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

  const totalStudyMinutes =
    (
      await prisma.learningSession.findMany({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },

        select: {
          duration: true,
        },
      })
    ).reduce(
      (sum, session) =>
        sum + (session.duration ?? 0),
      0
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

  const nextNode =
    roadmap?.nodes.find(
      (node) => !node.completed
    );

  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          StudyOS Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your personalized AI learning workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardHeader>
            <CardTitle>
              Overall Progress
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Progress value={progress} />

            <p className="mt-3 text-sm">
              {completed} / {total} roadmap
              steps completed
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

            <p className="mt-2 text-sm text-muted-foreground">
              completed sessions
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

            <p className="mt-2 text-sm text-muted-foreground">
              total minutes
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

            <p className="mt-2 text-sm text-muted-foreground">
              AI reflections completed
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
                "No goal yet"}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {roadmap?.goal.description ??
                "Create your first goal."}
            </p>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>
              Next Learning Task
            </CardTitle>
          </CardHeader>

          <CardContent>

            {nextNode ? (
              <>
                <p className="font-semibold">
                  Week {nextNode.week}
                </p>

                <p className="mt-2">
                  {nextNode.title}
                </p>

                <Link
                  href="/roadmap"
                  className="mt-4 block"
                >
                  <Button className="w-full">
                    Continue Learning
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-lg">
                  🎉 Roadmap Completed
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Great work! Create a new goal to continue learning.
                </p>
              </>
            )}

          </CardContent>

        </Card>

      </div>

      <InsightCard />

      <DashboardGoals />

    </main>
  );
}