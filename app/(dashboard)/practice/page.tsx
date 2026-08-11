export default function PracticePage() {
  return (
    <main className="space-y-8 p-6">

      <section>
        <h1 className="text-4xl font-bold">
          AI Practice Arena
        </h1>

        <p className="mt-2 text-muted-foreground">
          Practice concepts, test your understanding and improve your skills with AI-powered questions.
        </p>
      </section>


      <section className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border p-6">

          <h2 className="text-lg font-semibold">
            AI Generated Questions
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Generate personalized questions based on your learning goals and progress.
          </p>

        </div>



        <div className="rounded-xl border p-6">

          <h2 className="text-lg font-semibold">
            Skill Improvement
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Identify weak concepts and improve through focused practice.
          </p>

        </div>




        <div className="rounded-xl border p-6">

          <h2 className="text-lg font-semibold">
            Adaptive Learning
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Practice difficulty adjusts according to your performance.
          </p>

        </div>


      </section>


      <section className="rounded-xl border p-6">

        <h2 className="text-xl font-semibold">
          Practice Sessions
        </h2>


        <p className="mt-2 text-muted-foreground">
          Start practicing to strengthen your understanding and track improvement.
        </p>


      </section>


    </main>
  );
}