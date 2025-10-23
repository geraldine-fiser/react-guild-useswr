import { NextResponse } from "next/server";
import { getCoordinatesByName } from "@/lib/cities";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const units = searchParams.get("units") || "metric"; // Default to metric (Celsius)
  const { lat, lon } = getCoordinatesByName(city as string);
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "City not found or invalid coordinates" },
      { status: 400 }
    );
  }

  console.log(
    `Fetching weather for ${city}: ${lat}, ${lon} with units: ${units}`
  );

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Weather API error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
