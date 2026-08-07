import { CompanionChat } from "@/features/companion/components/companion-chat";

export default function CompanionPage() {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          AI Companion
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your personal AI mentor for studying,
          planning,
          motivation,
          and doubt solving.
        </p>
      </div>

      <CompanionChat />
    </div>
  );
}