export default async function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6">
        <h1 className="text-lg font-bold">Idea Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, Founder!</span>
        </div>
      </header>
      <main className="flex-1 p-6">
        <h2 className="text-xl">Your Metrics will be here.</h2>
        {/* Dashboard components will go here */}
      </main>
    </div>
  );
}
