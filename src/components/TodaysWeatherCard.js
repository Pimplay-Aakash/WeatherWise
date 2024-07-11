import React from 'react';

const TodaysWeatherCard = ({ weather, location, date }) => {
    // console.log('weather card data', weather);
  return (
    <div className="border rounded-lg p-4 shadow-md bg-gray-50">
      {location && (
        <h2 className="text-lg mb-4 font-bold">{`${location.name}, ${location.region}, ${location.country}`}</h2>
      )}
      {date && <p className="text-sm">{date}</p>}
      {weather && (
        <>
          <div className="flex items-center justify-between">
            <img src={weather.condition.icon} alt={weather.condition.text} />
            <div>
              <p className="text-xl font-bold">{`${weather.temp_c}°C`}</p>
              <p className="text-sm">{weather.condition.text}</p>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind_kph} km/h</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TodaysWeatherCard;
