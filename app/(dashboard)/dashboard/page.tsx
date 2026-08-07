import { DashboardGoals } from "@/features/goals/components/dashboard-goals";

export default function DashboardPage() {
  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">
          StudyOS Dashboard
        </h1>

        <p className="text-muted-foreground">
          Build your personalized learning journey.
        </p>
      </div>

      <DashboardGoals />
    </main>
  );
}