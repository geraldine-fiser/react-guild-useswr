// Major cities around the world with their coordinates
export const citiesCoordinates = [
  {
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    lat: 35.6762,
    lon: 139.6503,
  },
  {
    name: "Beijing",
    country: "China",
    countryCode: "CN",
    lat: 39.9042,
    lon: 116.4074,
  },
  {
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    name: "Paris",
    country: "France",
    countryCode: "FR",
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    name: "New York",
    country: "United States",
    countryCode: "US",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: "Los Angeles",
    country: "United States",
    countryCode: "US",
    lat: 34.0522,
    lon: -118.2437,
  },
  {
    name: "Sydney",
    country: "Australia",
    countryCode: "AU",
    lat: -33.8688,
    lon: 151.2093,
  },
  {
    name: "Cairo",
    country: "Egypt",
    countryCode: "EG",
    lat: 30.0444,
    lon: 31.2357,
  },
  {
    name: "Moscow",
    country: "Russia",
    countryCode: "RU",
    lat: 55.7558,
    lon: 37.6176,
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    lat: -22.9068,
    lon: -43.1729,
  },
  {
    name: "Mumbai",
    country: "India",
    countryCode: "IN",
    lat: 19.076,
    lon: 72.8777,
  },
  {
    name: "Toronto",
    country: "Canada",
    countryCode: "CA",
    lat: 43.6532,
    lon: -79.3832,
  },
  {
    name: "Berlin",
    country: "Germany",
    countryCode: "DE",
    lat: 52.52,
    lon: 13.405,
  },
  {
    name: "Mexico City",
    country: "Mexico",
    countryCode: "MX",
    lat: 19.4326,
    lon: -99.1332,
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    lat: -34.6118,
    lon: -58.396,
  },
  {
    name: "Cape Town",
    country: "South Africa",
    countryCode: "ZA",
    lat: -33.9249,
    lon: 18.4241,
  },
  {
    name: "Seoul",
    country: "South Korea",
    countryCode: "KR",
    lat: 37.5665,
    lon: 126.978,
  },
  {
    name: "Bangkok",
    country: "Thailand",
    countryCode: "TH",
    lat: 13.7563,
    lon: 100.5018,
  },
  {
    name: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    lat: 1.3521,
    lon: 103.8198,
  },
  {
    name: "Jakarta",
    country: "Indonesia",
    countryCode: "ID",
    lat: -6.2088,
    lon: 106.8456,
  },
];

// Helper function to get city by name
export function getCityByName(name: string) {
  return citiesCoordinates.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}

// Helper function to get all city names
export function getCityNames() {
  return citiesCoordinates.map((city) => city.name);
}

// Helper function to get cities by country
export function getCitiesByCountry(countryCode: string) {
  return citiesCoordinates.filter(
    (city) => city.countryCode.toLowerCase() === countryCode.toLowerCase()
  );
}
// Helper function to get latitude and longitude by city name
export function getCoordinatesByName(name: string) {
  const cityObject = citiesCoordinates.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
  return { lat: cityObject?.lat, lon: cityObject?.lon } as {
    lat: number;
    lon: number;
  };
}
