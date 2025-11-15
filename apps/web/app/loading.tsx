import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-[1200px] mx-auto mb-16">
      <div className="grid grid-cols-1 md:grid-cols-[7fr_17fr] xl:grid-cols-[6fr_12fr_7fr] gap-6 mt-8">
        {/* Left Sidebar Skeleton */}
        <aside className="hidden md:block">
          <Card heading="Top Competitions" className="h-[45vh] overflow-auto">
            <div className="p-4 space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-700 rounded" />
                  <div className="flex-1 h-4 bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* Main Content Skeleton */}
        <main>
          <div className="mb-6 hidden md:block">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome to Live Score</h2>
              <p className="text-blue-100">
                Follow live football scores and predictions
              </p>
            </div>
          </div>

          <h2 className="text-white text-xl font-semibold mb-4 hidden md:block">
            Football Matches
          </h2>

          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                  </div>
                  <div className="w-16 h-8 bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar Skeleton */}
        <aside className="hidden xl:block space-y-6">
          <Card className="h-[45vh] overflow-auto">
            <div className="p-4">
              <div className="h-10 bg-gray-700 rounded animate-pulse" />
            </div>
          </Card>

          <Card heading="Latest News" className="h-[45vh] overflow-auto">
            <div className="divide-y divide-gray-800">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          </Card>

          <Card heading="Standings" className="overflow-auto">
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/4" />
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
