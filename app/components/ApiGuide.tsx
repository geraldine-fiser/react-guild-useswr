"use client";

import { useState } from "react";
import { Code, Zap, RefreshCw } from "lucide-react";
import StepCard from "./StepCard";
import CodeBlock from "./CodeBlock";

export default function ApiGuide() {
  const [activeTab, setActiveTab] = useState<
    "endpoints" | "tutorial" | "references"
  >("tutorial");
  const endpoints = [
    {
      method: "GET",
      path: "/api/users/[id]/favorites",
      description: "Get user's favorite artists",
      response: `{
  "userId": "1",
  "userName": "John Doe",
  "favoriteArtists": ["Taylor Swift", "Drake", "Billie Eilish"]
}`,
    },
    {
      method: "POST",
      path: "/api/users/[id]/favorites",
      description: "Add artist to favorites",
      body: `{
  "artist": "Taylor Swift"
}`,
    },
    {
      method: "DELETE",
      path: "/api/users/[id]/favorites",
      description: "Remove artist from favorites",
      body: `{
  "artist": "Taylor Swift"
}`,
    },
  ];

  const swrFeatures = [
    {
      name: "refreshInterval",
      description: "Automatically refetch data at specified intervals",
      example: `useSWR('/api/users/1/favorites', fetcher, {
  refreshInterval: 3000 // Refresh every 3 seconds
})`,
    },
    {
      name: "revalidateOnFocus",
      description: "Revalidate data when window regains focus",
      example: `useSWR('/api/users/1/favorites', fetcher, {
  revalidateOnFocus: true // Default: true
})`,
    },
    {
      name: "revalidateOnReconnect",
      description: "Revalidate data when network reconnects",
      example: `useSWR('/api/users/1/favorites', fetcher, {
  revalidateOnReconnect: true // Default: true
})`,
    },
    {
      name: "dedupingInterval",
      description: "Dedupe requests within the specified time window",
      example: `useSWR('/api/users/1/favorites', fetcher, {
  dedupingInterval: 2000 // 2 seconds
})`,
    },
    {
      name: "mutate",
      description: "Manually trigger data revalidation",
      example: `const { data, mutate } = useSWR('/api/users/1/favorites', fetcher);

// After POST/DELETE
mutate(); // Revalidate data`,
    },

    {
      name: "custom hooks",
      description: "Create reusable SWR logic",
      example: `function useUserFavorites(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    \`/api/users/\${userId}/favorites\`,
    fetcher
  );
  
  return {
    favorites: data?.favoriteArtists,
    isLoading,
    isError: error,
    mutate
  };
}`,
    },
  ];

  return (
    <div className="h-full border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          SWR Artist Tracker Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn SWR features by building an artist tracker with favorite artists
        </p>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("tutorial")}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "tutorial"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>Tutorial</span>
          </button>
          <button
            onClick={() => setActiveTab("endpoints")}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "endpoints"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Code className="h-4 w-4" />
            <span>Endpoints</span>
          </button>

          <button
            onClick={() => setActiveTab("references")}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "references"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            <span>SWR Reference</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "endpoints" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Available API Endpoints
              </h2>
              <div className="space-y-3">
                {endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : endpoint.method === "POST"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {endpoint.description}
                    </p>
                    {endpoint.response && (
                      <CodeBlock
                        code={endpoint.response}
                        language="json"
                        title="Response"
                      />
                    )}
                    {endpoint.body && (
                      <CodeBlock
                        code={endpoint.body}
                        language="json"
                        title="Request Body"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "tutorial" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tutorial Steps
              </h2>
              <div className="space-y-3">
                <StepCard
                  stepNumber={1}
                  title="Add basic SWR call"
                  description="Set up the fundamental data fetching with SWR"
                  code={`import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function FavoriteArtists({ userId }: { userId: string }) {
  const { data, error, isLoading } = useSWR(
    \`/api/users/\${userId}/favorites\`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading favorites</div>;

  return (
    <div>
      <h3>User {userId}'s Favorites</h3>
      {data?.favoriteArtists?.map(artist => (
        <div key={artist}>{artist}</div>
      ))}
    </div>
  );
}`}
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      <strong>What this does:</strong> Creates the basic SWR
                      hook to fetch user favorites from the API.
                    </p>
                    <p className="mb-2">
                      <strong>How to test revalidateOnFocus:</strong> Add a new
                      favorite artist. Note that nothing updates yet. Navigate
                      to another tab and come back. Note that the list refreshes
                      with the additional artist.
                    </p>
                  </div>
                </StepCard>

                <StepCard
                  stepNumber={2}
                  title="Add refreshInterval"
                  description="Automatically refresh data every few seconds"
                  code={`useSWR('/api/users/1/favorites', fetcher, {
  refreshInterval: 3000 // Refresh every 3 seconds
})`}
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      <strong>What this does:</strong> Automatically refetches
                      data at the specified interval.
                    </p>
                    <p>
                      <strong>How to test:</strong> Add a new favorite artist
                      and wait 3 seconds to see the data update.
                    </p>
                  </div>
                </StepCard>

                <StepCard
                  stepNumber={3}
                  title="Use mutate function"
                  description="Manually trigger data revalidation after mutations"
                  code={`const { data, mutate } = useSWR('/api/users/1/favorites', fetcher);

const addArtist = async (artist) => {
  await posting to the API...
  mutate(); // Revalidate data
};`}
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      <strong>What this does:</strong> Manually triggers data
                      revalidation.
                    </p>
                    <p>
                      <strong>How to test:</strong> Update UI immediately after
                      (POST/PUT/DELETE) with mutate(). Add an artist and see the
                      data update before the refreshInterval.
                    </p>
                  </div>
                </StepCard>

                <StepCard
                  stepNumber={4}
                  title="Create useUserFavorites hook"
                  description="Build a reusable custom hook for user favorites"
                  code={`function useUserFavorites(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    \`/api/users/\${userId}/favorites\`,
    fetcher
  );
  
  return {
    favorites: data?.favoriteArtists,
    isLoading,
    isError: error,
    mutate,
  };
}

// Usage
const { favorites, isLoading, mutate } = useUserFavorites('1');`}
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      <strong>What this does:</strong> Encapsulates SWR logic in
                      a reusable hook.
                    </p>
                    <p>
                      <strong>Benefits:</strong> When using the hook in multiple
                      components on the same page, since all the swr calls have
                      the same SWR key and are rendered almost at the same time,
                      only 1 network request will be made. You can reuse your
                      data hooks everywhere, without worrying about performance
                      or duplicated requests.
                    </p>
                  </div>
                </StepCard>
              </div>
            </div>
          </div>
        )}

        {activeTab === "references" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                SWR Features Reference{" "}
                <a
                  href="https://swr.vercel.app/docs/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 text-sm mb-4"
                >
                  Check out the full options here
                </a>
              </h2>
              <div className="space-y-4">
                {swrFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    <CodeBlock code={feature.example} language="typescript" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
