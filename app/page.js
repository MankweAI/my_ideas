// app/page.js
import { createServer } from "@/lib/supabase";
import { CreateIdea } from "./create-idea";
import Chart from "@/components/Chart";
import { deleteIdeaAction } from "./actions"; // Import the delete action
import { Button } from "@/components/ui/button"; // Import the Button component

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
          <CreateIdea />
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Ideas</h2>
            {/* ... (error and empty states) ... */}
            <div className="grid gap-4">
              {ideas?.map((idea) => (
                <div
                  key={idea.id}
                  className="rounded-lg border bg-card p-4 flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {idea.title}
                    </h3>
                    <p className="mt-2 text-foreground">{idea.description}</p>
                  </div>
                  {/* Add the delete form and button */}
                  <form action={deleteIdeaAction}>
                    <input type="hidden" name="id" value={idea.id} />
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Idea Scores</h2>
            <div className="rounded-lg border bg-card p-4">
              <Chart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
