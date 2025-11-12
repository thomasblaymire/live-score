export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">⚽ Live Score</h1>
        <p className="text-gray-400">
          Next.js 15 + Tailwind CSS + TurboRepo
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="/matches"
            className="px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg transition-colors"
          >
            View Matches
          </a>
          <a
            href="/predict"
            className="px-6 py-3 bg-surface hover:bg-gray-800 rounded-lg transition-colors"
          >
            Make Predictions
          </a>
        </div>
      </div>
    </main>
  );
}
