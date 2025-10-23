"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import useSWR from "swr";
import { getCityNames } from "../../../lib/cities";
import WeatherCard from "./components/WeatherCard";
import MetricCard from "./components/MetricCard";
import SWRDemo from "@/app/(demo)/weather/components/SWRDemo";

import { Thermometer, Wind, Cloud, Droplets } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Weather() {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  const { data, error, isLoading } = useSWR(
    city ? `/api/weather?city=${city}&units=${units}` : null,
    fetcher
  );

  const unitSymbol = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - SWR Demo */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <SWRDemo />
            </div>
          </div>

          {/* Right Column - Weather App + Favorite Stocks */}
          <div className="space-y-6">
            {/* Weather App */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Weather App with SWR
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time weather data with SWR&apos;s powerful caching and
                  revalidation
                </p>
              </div>

              {/* Header with city selector and unit toggle */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <div className="flex-1">
                  <Select onValueChange={setCity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCityNames().map((cityName: string) => (
                        <SelectItem key={cityName} value={cityName}>
                          {cityName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Unit Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setUnits("metric")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      units === "metric"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setUnits("imperial")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      units === "imperial"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2 text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Loading weather for {city}...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
                    <span>❌</span>
                    <span>Failed to load weather for {city}</span>
                  </div>
                </div>
              )}

              {/* No City Selected */}
              {!city && !isLoading && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Cloud className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a city to get weather information</p>
                </div>
              )}

              {/* Weather Data Display */}
              {data && !error && (
                <div className="space-y-6">
                  {/* Main Weather Card */}
                  <WeatherCard
                    city={data.name}
                    country={data.sys.country}
                    temperature={data.main.temp}
                    description={data.weather[0].description}
                    icon={data.weather[0].icon}
                    unit={unitSymbol}
                  />

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MetricCard
                      label="Temperature"
                      value={Math.round(data.main.temp)}
                      icon={Thermometer}
                      unit={unitSymbol}
                    />
                    <MetricCard
                      label="Feels Like"
                      value={Math.round(data.main.feels_like)}
                      icon={Thermometer}
                      unit={unitSymbol}
                    />
                    <MetricCard
                      label="Cloudiness"
                      value={data.clouds.all}
                      icon={Cloud}
                      unit="%"
                    />
                    <MetricCard
                      label="Humidity"
                      value={data.main.humidity}
                      icon={Droplets}
                      unit="%"
                    />
                    <MetricCard
                      label="Wind Speed"
                      value={data.wind.speed}
                      icon={Wind}
                      unit={windUnit}
                    />
                    <MetricCard
                      label="Pressure"
                      value={data.main.pressure}
                      icon={Droplets}
                      unit="hPa"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
