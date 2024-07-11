import React from 'react';

const WeatherCard = ({ weather, date, location }) => (
  <div className="border p-4 rounded shadow-md bg-gray-50">
    {date && <p className="text-sm font-bold">{new Date(date).toLocaleDateString()}</p>}
    {location && <p className="text-lg font-bold">{location.name}, {location.region}</p>}
    <div className="flex items-center">
      <img src={weather.condition.icon} alt={weather.condition.text} />
      <div className="ml-4">
        <p className="text-2xl">{weather.avgtemp_c || weather.temp_c}°C</p>
        <p className="text-sm">{weather.condition.text}</p>
        {weather.maxtemp_c && <p>Max: {weather.maxtemp_c}°C</p>}
        {weather.mintemp_c && <p>Min: {weather.mintemp_c}°C</p>}
      </div>
    </div>
  </div>
);

export default WeatherCard;
