import { SessionCard } from "@/features/study-session/components/session-card";
import { SessionHistory } from "@/features/study-session/components/session-history";

export default function SessionsPage() {
  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Study Sessions
        </h1>

        <p className="mt-2 text-muted-foreground">
          Track every focused study session and monitor your consistency.
        </p>
      </div>

      <SessionCard />

      <SessionHistory />

    </main>
  );
}