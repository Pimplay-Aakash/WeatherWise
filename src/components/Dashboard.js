import React, { useState, useEffect } from "react";
import axios from "axios";
import TodaysWeatherCard from "./TodaysWeatherCard";
import HighlightsCard from "./HighlightsCard";
import TemperatureChart from "./TemperatureChart";
import WeatherCard from "./WeatherCard";
import LocationIcon from "../assets/imgs/placeholder.png";
import LoginForm from "./LoginForm";
import Logo from "../assets/imgs/logo.png";
// import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { auth } from "../config/firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import NotificationSettingsModal from "./NotificationSettingsModal";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    eventPlanners: { rain: false, extremeTemp: false, highWinds: false },
    farmers: { frost: false, heavyRain: false, optimalTimes: false },
    travelers: {
      severeWeather: false,
      idealTravel: false,
      routeChanges: false,
    },
  });
  const [notifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    fetchCurrentLocationWeather();

    return () => unsubscribe();
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut(auth).catch((error) => {
        console.error("Error signing out:", error);
      });
    } else {
      setShowLoginForm(true);
    }
  };

  const fetchWeatherData = async (query) => {
    const apiKey = "841f4f8a3d7d47baa6e91239240707";
    if (!query) {
      setError("Location is empty. Please provide a valid location.");
      return;
    }

    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3`
      );
      setWeatherData(response.data);
      setForecastData(response.data.forecast.forecastday);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  const fetchCurrentLocationWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`${latitude},${longitude}`);
        },
        (err) => {
          console.error("Geolocation Error:", err);
          setError(`Unable to fetch location: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  console.log(showNotificationModal);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    }
  };

  return (
    <div className="flex">
      {showLoginForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <LoginForm onClose={() => setShowLoginForm(false)} />
        </div>
      )}
      {/* {showNotificationModal && (
        <NotificationSettingsModal
          weatherData={weatherData}
          notificationPreferences={notificationPreferences}
          setNotificationPreferences={setNotificationPreferences}
          onClose={() => setShowNotificationModal(false)}
        />
      )} */}
      <div className="flex-1 min-h-screen bg-blue-50">
        <div className="flex justify-between items-center mb-8 px-24 py-3 bg-gradient-to-b from-teal-200 to-transparent">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Weather App Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">WeatherWise</h1>
          </div>
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={fetchCurrentLocationWeather}
              className="ml-2 bg-transparent flex justify-around items-center gap-2 text-blue-950 p-2 rounded"
            >
              <img className="w-6" src={LocationIcon} alt="location Icon" />
              <span className="font-medium">Current Location</span>
            </button>
            <form
              onSubmit={handleLocationSubmit}
              className="flex justify-center"
            >
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter a location"
                className="p-2 rounded-l-md"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
              >
                Get Weather
              </button>
            </form>

             <NotificationSettingsModal
          weatherData={weatherData}
          notificationPreferences={notificationPreferences}
          setNotificationPreferences={setNotificationPreferences}
          onClose={() => setShowNotificationModal(false)}
        />
            {isAuthenticated ? (
              <button
                onClick={handleAuthClick}
                className="text-gray-400 bg-cyan-400 hover:bg-cyan-300 px-2 py-1 rounded-2xl flex items-center gap-2 hover:text-blue-800"
                data-tooltip-id="tooltip"
                data-tooltip-content="Logout"
              >
                <span className="text-blue-950">Logout</span>
                <FaSignOutAlt size={22} className=" text-blue-950" />
              </button>
            ) : (
              <button
                onClick={handleAuthClick}
                className="text-gray-400 bg-cyan-400 hover:bg-cyan-300 px-2 py-1 rounded-2xl flex items-center gap-2 hover:text-blue-800"
                data-tooltip-id="tooltip"
                data-tooltip-content="Login"
              >
                <span className=" text-blue-950 ">SignIn</span>
                <FaSignInAlt size={22} className=" text-blue-950 " />
              </button>
            )}
          </div>
        </div>
        <div className="container mx-auto p-4">
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {weatherData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <TodaysWeatherCard
                weather={weatherData.current}
                location={weatherData.location}
              />
              <div className="col-span-2">
                <h2 className="text-xl font-bold mb-2">3-Day Forecast</h2>
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {forecastData.map((day, index) => (
                    <WeatherCard
                      key={index}
                      weather={day.day}
                      date={day.date}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {weatherData && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Today's Highlights</h2>
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                <HighlightsCard
                  title="Feels Like"
                  value={`${weatherData.current.feelslike_c}°C`}
                />
                <HighlightsCard
                  title="Wind"
                  value={`${weatherData.current.wind_kph} km/h`}
                />
                <HighlightsCard
                  title="Humidity"
                  value={`${weatherData.current.humidity}%`}
                />
                <HighlightsCard
                  title="UV Index"
                  value={weatherData.current.uv}
                />
                <HighlightsCard
                  title="Visibility"
                  value={`${weatherData.current.vis_km} km`}
                />
              </div>
            </div>
          )}
          {forecastData.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">
                Today's Temperature Predictions
              </h2>
              <TemperatureChart forecast={forecastData} />
            </div>
          )}
          {notifications.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <ul className="list-disc ml-5">
                {notifications.map((notification, index) => (
                  <li key={index} className="text-red-500">
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
