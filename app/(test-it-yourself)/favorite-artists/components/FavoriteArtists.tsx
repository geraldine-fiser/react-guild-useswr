"use client";

import { useState } from "react";
import { Plus, X, TrendingUp, Star } from "lucide-react";
import DisplayOnlyFavorites from "./DuplicateFavoriteArtists";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 📌 Tutorial Step 1: you'll need to import useSWR and set up a fetcher function to fetch the data from the API
//  const fetcher = ...
// ------------------------------------------------------------

interface FavoriteArtistsProps {
  userId: string;
}

export default function FavoriteArtists({ userId }: FavoriteArtistsProps) {
  const [newArtist, setNewArtist] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // 📌 Tutorial Step 1: use SWR to fetch the data from the API
  // const { data, error, isLoading } = useSWR(....
  // replace the data below with yours from swr
  // ------------------------------------------------------------
  // Tutorial Step 2: use refreshInterval to revalidate the data from swr above
  //  ------------------------------------------------------------
  const data = null;
  const isLoading = false;
  const error = null;

  const addArtist = async (artist: string) => {
    if (!artist.trim()) return;

    setIsAdding(true);
    // 📌  Tutorial Step 3: Use the mutate function to revalidate faster than the refreshInterval
    // ------------------------------------------------------------
    try {
      const response = await fetch(`/api/users/${userId}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist: artist.trim() }),
      });

      if (response.ok) {
        setNewArtist("");
      } else {
        const errorData = await response.json();
        console.error("Failed to add artist:", errorData.error);
      }
    } catch (error) {
      console.error("Failed to add artist:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const removeArtist = async (artist: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/favorites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist }),
      });

      if (response.ok) {
        // 📌  Tutorial Step 3: Use Mutate function to revalidate faster than the refreshInterval
        // ------------------------------------------------------------
      } else {
        const errorData = await response.json();
        console.error("Failed to remove artist:", errorData.error);
      }
    } catch (error) {
      console.error("Failed to remove artist:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addArtist(newArtist);
  };

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span>Loading favorites...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div className="text-red-500">Error loading favorites</div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Favorite Artists
          </h3>
          {data?.userName && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({data.userName})
            </span>
          )}
        </div>

        {/* Add new artist form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
            placeholder="Enter artist name (e.g., Taylor Swift)"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isAdding}
          />
          <button
            type="submit"
            disabled={!newArtist.trim() || isAdding}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm"
          >
            {isAdding ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </form>

        <div className="space-y-2">
          {data?.favoriteArtists?.length > 0 ? (
            data.favoriteArtists.map((artist: string) => (
              <div
                key={artist}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {artist}
                  </span>
                </div>
                <button
                  onClick={() => removeArtist(artist)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors"
                  title="Remove from favorites"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No favorite artists yet</p>
              <p className="text-sm">Add some artists to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* 📌  Tutorial Step 4: Uncomment this component to re-use the useUserFavorites hook in it
      ------------------------------------------------------------ */}
      {/* <div className="mt-5 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <DuplicateFavoriteArtists userId={userId} />
      </div> */}
    </>
  );
}
