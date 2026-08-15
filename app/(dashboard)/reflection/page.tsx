import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { ReflectionForm } from "@/features/reflection/components/reflection-form";
import { ReflectionHistory } from "@/features/reflection/components/reflection-history";


export default async function ReflectionPage() {

  const user = await getCurrentUser();


  const goal = await prisma.goal.findFirst({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Reflection Journal
        </h1>

        <p className="text-muted-foreground mt-2">
          Reflect on today&apos;s learning and let AI guide your improvement.
        </p>
      </div>


      <ReflectionForm
        goalId={goal?.id}
      />


      <ReflectionHistory />

    </main>
  );
}