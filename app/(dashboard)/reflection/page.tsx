import { ReflectionForm } from "@/features/reflection/components/reflection-form";
import { ReflectionHistory } from "@/features/reflection/components/reflection-history";

export default function ReflectionPage() {
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

      <ReflectionForm />

      <ReflectionHistory />

    </main>
  );
}