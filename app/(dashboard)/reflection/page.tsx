import { ReflectionForm } from "@/features/reflection/components/reflection-form";

export default function ReflectionPage() {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          AI Reflection
        </h1>

        <p className="mt-2 text-muted-foreground">
          Reflect on today&apos;s learning and let AI
          analyze your strengths, weaknesses, and
          recommend your next step.
        </p>
      </div>

      <ReflectionForm />
    </div>
  );
}