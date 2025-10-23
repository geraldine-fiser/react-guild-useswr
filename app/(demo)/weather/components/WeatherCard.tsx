interface WeatherCardProps {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  unit: string;
}

export default function WeatherCard({
  city,
  country,
  temperature,
  description,
  icon,
  unit,
}: WeatherCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{city}</h2>
          <p className="text-blue-100">{country}</p>
        </div>
        <div className="text-right">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16"
          />
        </div>
      </div>

      <div className="text-center">
        <div className="text-6xl font-light mb-2">
          {Math.round(temperature)}°
        </div>
        <div className="text-xl text-blue-100 mb-1">{description}</div>
        <div className="text-sm text-blue-200">{unit}</div>
      </div>
    </div>
  );
}
