import FavoriteArtists from "./components/FavoriteArtists";
import ApiGuide from "../../components/ApiGuide";

export default function PriceTracker() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column - API Guide */}
          <div className="bg-white dark:bg-gray-800 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <ApiGuide />
          </div>

          {/* Right Column - Working Area */}
          <div className="p-6 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Artist Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Follow the guide on the left to learn SWR features step by step
              </p>
            </div>

            {/* Favorite Artists Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <FavoriteArtists userId="1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
