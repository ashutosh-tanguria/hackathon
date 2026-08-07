import { AssessmentForm } from "@/features/assessment/components/assessment-form";

interface AssessmentPageProps {
  searchParams: Promise<{
    goalId?: string;
  }>;
}

export default async function AssessmentPage({
  searchParams,
}: AssessmentPageProps) {
  const { goalId } = await searchParams;

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-6 text-3xl font-bold">
        AI Skill Assessment
      </h1>

      <AssessmentForm goalId={goalId} />
    </div>
  );
}