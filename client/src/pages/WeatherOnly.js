import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import { 
  FaThermometerHalf, 
  FaTint, 
  FaWind, 
  FaCloudRain, 
  FaMapMarkerAlt,
  FaSun,
  FaMoon,
  FaCloud,
  FaCloudSun,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaBolt,
  FaSmog,
  FaSearch,
  FaLocationArrow,
  FaCalendarAlt,
  FaEye,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaArrowUp,
  FaArrowDown,
  FaSpinner,
  FaArrowLeft
} from 'react-icons/fa';

const WeatherOnly = () => {
  const navigate = useNavigate();

  const API_KEY = "165ac561bb8fd08126ca6f2d23617262";

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [recentSearches, setRecentSearches] = useState([]);

  const weatherIcons = {
    '01d': <FaSun className="weather-icon sun" />,
    '01n': <FaMoon className="weather-icon moon" />,
    '02d': <FaCloudSun className="weather-icon cloud-sun" />,
    '02n': <FaCloudSun className="weather-icon cloud-moon" />,
    '03d': <FaCloud className="weather-icon cloud" />,
    '03n': <FaCloud className="weather-icon cloud" />,
    '04d': <FaCloud className="weather-icon cloud" />,
    '04n': <FaCloud className="weather-icon cloud" />,
    '09d': <FaCloudShowersHeavy className="weather-icon rain" />,
    '09n': <FaCloudShowersHeavy className="weather-icon rain" />,
    '10d': <FaCloudRain className="weather-icon rain-sun" />,
    '10n': <FaCloudRain className="weather-icon rain-moon" />,
    '11d': <FaBolt className="weather-icon thunder" />,
    '11n': <FaBolt className="weather-icon thunder" />,
    '13d': <FaSnowflake className="weather-icon snow" />,
    '13n': <FaSnowflake className="weather-icon snow" />,
    '50d': <FaSmog className="weather-icon mist" />,
    '50n': <FaSmog className="weather-icon mist" />
  };

  // Get weather data from OpenWeather API
  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
      } else {
        const processedWeather = {
          name: data.name,
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          feels_like: Math.round(data.main.feels_like),
          temp_min: Math.round(data.main.temp_min),
          temp_max: Math.round(data.main.temp_max),
          icon: data.weather[0].icon,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          visibility: data.visibility
        };
        
        setWeather(processedWeather);

        // Save to recent searches
        const search = {
          city: city,
          temp: processedWeather.temp,
          icon: processedWeather.icon,
          timestamp: new Date().toLocaleTimeString(),
          location: data.name
        };

        setRecentSearches(prev => {
          const filtered = prev.filter(s => s.city.toLowerCase() !== city.toLowerCase());
          const updated = [search, ...filtered.slice(0, 4)];
          localStorage.setItem('recentWeatherSearches', JSON.stringify(updated));
          return updated;
        });

        // Get forecast data
        await getForecast();
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get forecast data
  const getForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "200") {
        // Process forecast data for 5 days
        const dailyForecast = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          if (!dailyForecast[date]) {
            dailyForecast[date] = {
              temps: [],
              humidity: [],
              weather: [],
              windSpeed: [],
              date: date
            };
          }
          dailyForecast[date].temps.push(item.main.temp);
          dailyForecast[date].humidity.push(item.main.humidity);
          dailyForecast[date].weather.push(item.weather[0]);
          dailyForecast[date].windSpeed.push(item.wind.speed);
        });

        const forecastArray = Object.keys(dailyForecast).slice(0, 5).map(date => {
          const day = dailyForecast[date];
          const avgTemp = day.temps.reduce((a, b) => a + b, 0) / day.temps.length;
          const avgHumidity = day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length;
          const mainWeather = day.weather[0];

          return {
            date: date,
            temp: {
              avg: Math.round(avgTemp),
              min: Math.min(...day.temps),
              max: Math.max(...day.temps)
            },
            weather: {
              description: mainWeather.description,
              icon: mainWeather.icon,
              main: mainWeather.main
            },
            humidity: Math.round(avgHumidity),
            windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length)
          };
        });

        setForecast({
          success: true,
          city: {
            name: data.city.name,
            country: data.city.country
          },
          forecast: forecastArray
        });
      }
    } catch (err) {
      console.error("Forecast fetch error:", err);
    }
  };

  // Get location weather
  const getLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Get city name from coordinates
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            
            if (data.cod === 200) {
              const cityName = data.name;
              setCity(cityName);
              
              const processedWeather = {
                name: data.name,
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                pressure: data.main.pressure,
                feels_like: Math.round(data.main.feels_like),
                temp_min: Math.round(data.main.temp_min),
                temp_max: Math.round(data.main.temp_max),
                icon: data.weather[0].icon,
                country: data.sys.country,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                visibility: data.visibility
              };
              
              setWeather(processedWeather);
              setError('');
              
              // Get forecast for location
              await getForecast();
            }
          } catch (err) {
            setError('Failed to fetch location weather');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError('Please enable location access or enter city manually');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    // Load recent searches
    const saved = localStorage.getItem('recentWeatherSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    
    // Load default city
    setCity('Mumbai');
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="weather-page">
      <div className="page">
        <div className="header-nav">
          <button
            onClick={() => navigate("/")}
            className="back-button"
          >
            <FaArrowLeft /> Back to Home
          </button>
          <h1 className="page-title">🌦 Live Weather Intelligence</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="weather-container"
        >
          {/* Search Section */}
          <div className="weather-search-section">
            <div className="weather-search-form">
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="search-input"
                  onKeyPress={(e) => e.key === 'Enter' && getWeather()}
                />
              </div>
              <div className="search-buttons">
                <button 
                  onClick={getWeather}
                  disabled={loading}
                  className="btn btn-search"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spinner" /> Loading...
                    </>
                  ) : (
                    <>
                      <FaSearch /> Search
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn btn-location"
                  onClick={getLocationWeather}
                  disabled={loading}
                >
                  <FaLocationArrow /> Use My Location
                </button>
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div className="recent-searches">
                <h4>Recent Searches:</h4>
                <div className="recent-cards">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="recent-card"
                      onClick={() => {
                        setCity(search.city);
                        getWeather();
                      }}
                    >
                      <div className="recent-city">{search.city}</div>
                      <div className="recent-temp">{search.temp}°C</div>
                      <div className="recent-icon">
                        {weatherIcons[search.icon] || <FaCloud />}
                      </div>
                      <div className="recent-time">{search.timestamp}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          {/* Weather Display */}
          <AnimatePresence>
            {weather && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="weather-display"
              >
                {/* Tabs */}
                <div className="weather-tabs">
                  <button
                    className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                    onClick={() => setActiveTab('current')}
                  >
                    Current Weather
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'forecast' ? 'active' : ''}`}
                    onClick={() => setActiveTab('forecast')}
                  >
                    5-Day Forecast
                  </button>
                </div>

                {/* Current Weather Tab */}
                {activeTab === 'current' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="current-weather"
                  >
                    <div className="simple-weather-card">
                      <div className="card-header">
                        <h2 className="location">
                          <FaMapMarkerAlt /> {weather.name}, {weather.country}
                        </h2>
                        <p className="weather-description">
                          {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
                        </p>
                        <p className="update-time">
                          Updated: {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                      
                      <div className="temperature-display">
                        <div className="temp-main">
                          {weather.temp}°C
                        </div>
                        <div className="temp-feels">
                          Feels like {weather.feels_like}°C
                        </div>
                      </div>
                      
                      <div className="weather-icon-large">
                        {weatherIcons[weather.icon] || <FaCloud />}
                      </div>

                      <div className="weather-details">
                        <div className="details-grid">
                          <div className="detail-item">
                            <FaTint className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Humidity</div>
                              <div className="detail-value">{weather.humidity}%</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaWind className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Wind Speed</div>
                              <div className="detail-value">{weather.windSpeed} m/s</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaArrowUp className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Pressure</div>
                              <div className="detail-value">{weather.pressure} hPa</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaTemperatureHigh className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">High</div>
                              <div className="detail-value">{weather.temp_max}°C</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaTemperatureLow className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Low</div>
                              <div className="detail-value">{weather.temp_min}°C</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaSun className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Sunrise</div>
                              <div className="detail-value">{formatTime(weather.sunrise)}</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaMoon className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Sunset</div>
                              <div className="detail-value">{formatTime(weather.sunset)}</div>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaEye className="detail-icon" />
                            <div className="detail-content">
                              <div className="detail-label">Visibility</div>
                              <div className="detail-value">
                                {(weather.visibility / 1000).toFixed(1)} km
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Forecast Tab */}
                {activeTab === 'forecast' && forecast && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="forecast-container"
                  >
                    <h3 className="forecast-title">
                      <FaCalendarAlt /> 5-Day Forecast for {forecast.city.name}
                    </h3>
                    
                    <div className="forecast-grid">
                      {forecast.forecast.map((day, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="forecast-card"
                        >
                          <div className="forecast-date">{formatDate(day.date)}</div>
                          <div className="forecast-icon">
                            {weatherIcons[day.weather.icon] || <FaCloud />}
                          </div>
                          <div className="forecast-temp">
                            <div className="temp-high">
                              <FaTemperatureHigh /> {Math.round(day.temp.max)}°C
                            </div>
                            <div className="temp-low">
                              <FaTemperatureLow /> {Math.round(day.temp.min)}°C
                            </div>
                          </div>
                          <div className="forecast-desc">
                            {day.weather.description}
                          </div>
                          <div className="forecast-details">
                            <span className="detail-item">
                              <FaTint /> {day.humidity}%
                            </span>
                            <span className="detail-item">
                              <FaWind /> {day.windSpeed} m/s
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        .weather-page {
          min-height: 100vh;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          background: white;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .page-title {
          color: white;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          margin: 0;
        }

        .weather-container {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          margin-bottom: 2rem;
        }

        .weather-search-section {
          margin-bottom: 2rem;
        }

        .weather-search-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .search-input-group {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e0e6ed;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-search {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          flex: 1;
        }

        .btn-location {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          flex: 1;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .recent-searches {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e6ed;
        }

        .recent-searches h4 {
          margin-bottom: 1rem;
          color: #333;
          font-size: 1rem;
        }

        .recent-cards {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.5rem;
        }

        .recent-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1rem;
          min-width: 120px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .recent-card:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .recent-city {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .recent-temp {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f093fb;
          margin-bottom: 0.5rem;
        }

        .recent-icon {
          font-size: 2rem;
          color: #FFD700;
          margin-bottom: 0.5rem;
        }

        .recent-time {
          font-size: 0.8rem;
          color: #666;
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          text-align: center;
          border-left: 4px solid #c62828;
        }

        .weather-display {
          margin-top: 1rem;
        }

        .weather-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          border-bottom: 2px solid #e0e6ed;
          padding-bottom: 1rem;
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .tab-btn:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        /* Simple Weather Card */
        .simple-weather-card {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .card-header h2 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .weather-description {
          color: #666;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
          font-size: 1.2rem;
        }

        .update-time {
          color: #888;
          font-size: 0.9rem;
        }

        .temperature-display {
          text-align: center;
          margin-bottom: 2rem;
        }

        .temp-main {
          font-size: 4rem;
          font-weight: 800;
          color: #f093fb;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .temp-feels {
          color: #666;
          font-size: 1.1rem;
        }

        .weather-icon-large {
          font-size: 5rem;
          color: #FFD700;
          text-align: center;
          margin-bottom: 2rem;
        }

        .weather-details {
          margin-top: 2rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .detail-item {
          background: white;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .detail-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .detail-icon {
          font-size: 1.5rem;
          color: #667eea;
        }

        .detail-content {
          flex: 1;
        }

        .detail-label {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        /* Forecast Styles */
        .forecast-container {
          margin-top: 1rem;
        }

        .forecast-title {
          color: #333;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .forecast-card {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .forecast-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .forecast-date {
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .forecast-icon {
          font-size: 2.5rem;
          color: #FFD700;
          margin: 1rem 0;
        }

        .forecast-temp {
          margin: 1rem 0;
        }

        .temp-high, .temp-low {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0.5rem 0;
          font-size: 1rem;
        }

        .temp-high {
          color: #f093fb;
        }

        .temp-low {
          color: #667eea;
        }

        .forecast-desc {
          color: #666;
          font-size: 0.9rem;
          margin: 1rem 0;
          text-transform: capitalize;
        }

        .forecast-details {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.9rem;
          color: #666;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }
          
          .header-nav {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .weather-container {
            padding: 1rem;
          }
          
          .search-buttons {
            flex-direction: column;
          }
          
          .weather-tabs {
            flex-direction: column;
          }
          
          .details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .forecast-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .temp-main {
            font-size: 3rem;
          }
          
          .weather-icon-large {
            font-size: 4rem;
          }
        }

        @media (max-width: 480px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .forecast-grid {
            grid-template-columns: 1fr;
          }
          
          .recent-cards {
            flex-direction: column;
          }
          
          .recent-card {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default WeatherOnly;