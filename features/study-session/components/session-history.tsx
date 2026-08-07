import { getLearningSessions } from "../actions";

export async function SessionHistory() {
  const sessions =
    await getLearningSessions();

  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Session History
        </h2>

        <p className="mt-2 text-muted-foreground">
          No study sessions completed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-bold">
        Session History
      </h2>

      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-xl border p-5"
        >
          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">
                {session.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {new Date(
                  session.startedAt
                ).toLocaleString()}
              </p>

            </div>

            <div className="text-right">

              <span className="rounded-md bg-primary/10 px-3 py-1 text-sm">
                {session.status}
              </span>

              <p className="mt-2 text-sm text-muted-foreground">
                {session.duration ?? 0} min
              </p>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
}