import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";


const NotificationSettingsModal = ({ weatherData, notificationPreferences, setNotificationPreferences }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (weatherData) {
      generateNotifications();
    }
  }, [weatherData, notificationPreferences]);

  const handleNotificationChange = (group, type) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [type]: !prev[group][type],
      },
    }));
  };

  const saveNotificationPreferences = () => {
    // Save preferences to local storage or backend
    setShowNotificationModal(false);
  };

  const cancelNotificationPreferences = () => {
    setShowNotificationModal(false);
  };

  const generateNotifications = () => {
    const newNotifications = [];

    if (notificationPreferences.eventPlanners.rain && weatherData.current.condition.text.includes("rain")) {
      newNotifications.push("Event Planners: Rain is expected today.");
    }
    if (notificationPreferences.eventPlanners.extremeTemp && (weatherData.current.temp_c > 30 || weatherData.current.temp_c < 0)) {
      newNotifications.push("Event Planners: Extreme temperatures are expected today.");
    }
    if (notificationPreferences.eventPlanners.highWinds && weatherData.current.wind_kph > 20) {
      newNotifications.push("Event Planners: High winds are expected today.");
    }

    if (notificationPreferences.farmers.frost && weatherData.current.temp_c < 0) {
      newNotifications.push("Farmers: Frost warning.");
    }
    if (notificationPreferences.farmers.heavyRain && weatherData.current.precip_mm > 10) {
      newNotifications.push("Farmers: Heavy rainfall expected.");
    }
    if (notificationPreferences.farmers.optimalTimes && weatherData.current.temp_c >= 15 && weatherData.current.temp_c <= 25) {
      newNotifications.push("Farmers: Optimal conditions for planting/harvesting.");
    }

    if (notificationPreferences.travelers.severeWeather && (weatherData.current.condition.text.includes("storm") || weatherData.current.condition.text.includes("snow"))) {
      newNotifications.push("Travelers: Severe weather warning.");
    }
    if (notificationPreferences.travelers.idealTravel && (weatherData.current.temp_c >= 10 && weatherData.current.temp_c <= 25)) {
      newNotifications.push("Travelers: Ideal travel conditions.");
    }
    if (notificationPreferences.travelers.routeChanges && weatherData.current.condition.text.includes("change")) {
      newNotifications.push("Travelers: Weather changes expected along your route.");
    }

    setNotifications(newNotifications);
  };

  return (
    <div>
      {showNotificationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md w-3/4 max-w-md">
            <h2 className="text-2xl mb-4">Notification Preferences</h2>
            <div>
              <h3 className="font-bold">Event Planners</h3>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.eventPlanners.rain}
                  onChange={() => handleNotificationChange("eventPlanners", "rain")}
                />
                Rain
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.eventPlanners.extremeTemp}
                  onChange={() => handleNotificationChange("eventPlanners", "extremeTemp")}
                />
                Extreme Temperatures
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.eventPlanners.highWinds}
                  onChange={() => handleNotificationChange("eventPlanners", "highWinds")}
                />
                High Winds
              </label>
            </div>
            <div>
              <h3 className="font-bold">Farmers</h3>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.farmers.frost}
                  onChange={() => handleNotificationChange("farmers", "frost")}
                />
                Frost
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.farmers.heavyRain}
                  onChange={() => handleNotificationChange("farmers", "heavyRain")}
                />
                Heavy Rain
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.farmers.optimalTimes}
                  onChange={() => handleNotificationChange("farmers", "optimalTimes")}
                />
                Optimal Planting/Harvesting Times
              </label>
            </div>
            <div>
              <h3 className="font-bold">Travelers</h3>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.travelers.severeWeather}
                  onChange={() => handleNotificationChange("travelers", "severeWeather")}
                />
                Severe Weather
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.travelers.idealTravel}
                  onChange={() => handleNotificationChange("travelers", "idealTravel")}
                />
                Ideal Travel Conditions
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notificationPreferences.travelers.routeChanges}
                  onChange={() => handleNotificationChange("travelers", "routeChanges")}
                />
                Route Changes
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelNotificationPreferences}
                className="mr-2 bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveNotificationPreferences}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Preferences
              </button>
            </div>
          </div>
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
      <button
        onClick={() => setShowNotificationModal(true)}
        className="text-gray-400 bg-cyan-400 hover:bg-cyan-300 px-2 py-1 rounded-2xl flex items-center gap-2 hover:text-blue-800"
      >
        <FaBell size={22} className="text-blue-950" />
        <span className="text-blue-950">Notifications</span>
      </button>
    </div>
  );
};

export default NotificationSettingsModal;
