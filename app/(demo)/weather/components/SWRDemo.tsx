"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  RefreshCw,
  Zap,
  Eye,
  Edit3,
  Clock,
  CheckCircle,
  Database,
} from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRDemo() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  // SWR hooks for different endpoints
  const { data: users, isLoading: usersLoading } = useSWR(
    selectedDemo === "deduplication" ? "/api/users/1/favorites" : null,
    fetcher
  );

  const { data: posts, isLoading: postsLoading } = useSWR(
    selectedDemo === "caching" ? "/api/users/2/favorites" : null,
    fetcher
  );

  const { data: comments, isLoading: commentsLoading } = useSWR(
    selectedDemo === "focus" ? "/api/users/3/favorites" : null,
    fetcher
  );

  const triggerFocusRefresh = () => {
    // Simulate window focus event
    window.dispatchEvent(new Event("focus"));
  };

  const demos = [
    {
      id: "deduplication",
      title: "Request Deduplication",
      icon: Zap,
      description:
        "Multiple components requesting the same data? SWR automatically deduplicates requests.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: "caching",
      title: "Intelligent Caching",
      icon: Clock,
      description:
        "Data loads instantly from cache. No unnecessary network requests.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "focus",
      title: "Window Focus Refresh",
      icon: Eye,
      description: "Automatically refreshes data when you return to the tab.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "mutation",
      title: "Optimistic Updates",
      icon: Edit3,
      description: "Update UI immediately, then sync with server. Great UX!",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          SWR Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Click on features to see them in action with real API calls
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-4">
        {demos.map((demo) => {
          const Icon = demo.icon;
          const isActive = selectedDemo === demo.id;
          const isLoading =
            (demo.id === "deduplication" && usersLoading) ||
            (demo.id === "caching" && postsLoading) ||
            (demo.id === "focus" && commentsLoading);

          return (
            <div
              key={demo.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isActive
                  ? `${demo.bgColor} ${demo.borderColor} border-2`
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setSelectedDemo(isActive ? null : demo.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 ${demo.color}`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {demo.description}
                  </p>
                </div>
                {isLoading && (
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                )}
                {isActive && !isLoading && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Content */}
      {selectedDemo && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {selectedDemo === "deduplication" && (
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Request Deduplication in Action
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Multiple components can request the same data simultaneously.
                SWR ensures only one request is made to the server.
              </p>
              <div className="bg-white dark:bg-gray-700 p-3 rounded border">
                <pre className="text-xs text-gray-600 dark:text-gray-300">
                  {`// Multiple components requesting same data
const { data } = useSWR('/api/users/1/favorites', fetcher);
const { data } = useSWR('/api/users/1/favorites', fetcher); // Same request!

// SWR automatically deduplicates these requests`}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SWR Benefits Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Why SWR is Amazing
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Automatic request deduplication</li>
          <li>• Built-in caching with smart revalidation</li>
          <li>• Window focus refresh</li>
          <li>• Optimistic updates with mutations</li>
          <li>• Error handling and retry logic</li>
          <li>• TypeScript support</li>
        </ul>
      </div>
    </div>
  );
}
