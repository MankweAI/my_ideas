import { cookies } from "next/headers";
import { createServer } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user ? `Welcome, ${user.email}` : ""}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-300"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6">
        <h2 className="text-xl">Your Metrics will be here.</h2>
        {/* Dashboard components will go here */}
      </main>
    </div>
  );
}
