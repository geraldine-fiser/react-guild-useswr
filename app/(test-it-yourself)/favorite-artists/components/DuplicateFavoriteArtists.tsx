import { TrendingUp } from "lucide-react";
import useUserFavorites from "../hooks/useUserFavorites";

export default function DisplayOnlyFavorites({ userId }: { userId: string }) {
  // use your own custom hook to fetch the data

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          List only favorite artists
        </h3>
        {userName && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({userName})
          </span>
        )}
      </div>

      {favorites?.length > 0 ? (
        favorites?.map((artist: string) => (
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
  );
}
