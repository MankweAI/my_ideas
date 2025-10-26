import { createServer } from "@/lib/supabase";

export default async function Home() {
  const supabase = createServer();
  const { data: ideas, error } = await supabase.from("ideas").select();

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex h-16 w-full items-center justify-between border-b bg-card px-6">
        <h1 className="text-lg font-bold">Idea Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, Founder!
          </span>
        </div>
      </header>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Ideas</h2>

        {/* Handle loading, error, and empty states */}
        {error && (
          <p className="text-destructive">
            Error loading ideas: {error.message}
          </p>
        )}
        {!error && !ideas?.length && (
          <p className="text-muted-foreground">
            You haven&apos;t added any ideas yet. Let&apos;s get started!
          </p>
        )}

        {/* Display the list of ideas */}
        <div className="grid gap-4">
          {ideas?.map((idea) => (
            <div key={idea.id} className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-semibold text-primary">
                {idea.title}
              </h3>
              <p className="mt-2 text-foreground">{idea.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
