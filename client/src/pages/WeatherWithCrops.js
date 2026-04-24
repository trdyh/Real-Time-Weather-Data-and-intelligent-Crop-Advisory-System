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
  FaSeedling,
  FaLeaf,
  FaTree,
  FaCheck,
  FaInfoCircle,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';

const WeatherWithCrops = () => {
  const navigate = useNavigate();

  const API_KEY = "165ac561bb8fd08126ca6f2d23617262";

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('weather');
  const [recentSearches, setRecentSearches] = useState([]);
  const [cropRecommendations, setCropRecommendations] = useState(null);
  const [cropLoading, setCropLoading] = useState(false);
  const [soilType, setSoilType] = useState('Loamy');
  const [recommendationType, setRecommendationType] = useState('location');

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clayey', 'Loamy'];

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

  // Crop database with weather requirements
  const cropDatabase = [
    {
      name: "Rice",
      temperature: { min: 20, max: 35, optimal: 25 },
      humidity: { min: 70, max: 90, optimal: 80 },
      rainfall: { min: 1000, max: 2500, optimal: 1500 },
      season: ["Kharif", "Summer"],
      description: "Requires high temperature and plenty of water",
      icon: <FaSeedling />,
      suitability: 0
    },
    {
      name: "Wheat",
      temperature: { min: 10, max: 25, optimal: 20 },
      humidity: { min: 50, max: 70, optimal: 60 },
      rainfall: { min: 500, max: 1000, optimal: 750 },
      season: ["Rabi"],
      description: "Cool season crop, requires moderate rainfall",
      icon: <FaLeaf />,
      suitability: 0
    },
    {
      name: "Maize",
      temperature: { min: 15, max: 30, optimal: 25 },
      humidity: { min: 60, max: 80, optimal: 70 },
      rainfall: { min: 600, max: 1200, optimal: 900 },
      season: ["Kharif"],
      description: "Warm season crop, needs well-drained soil",
      icon: <FaTree />,
      suitability: 0
    },
    {
      name: "Cotton",
      temperature: { min: 20, max: 35, optimal: 30 },
      humidity: { min: 50, max: 70, optimal: 60 },
      rainfall: { min: 500, max: 800, optimal: 650 },
      season: ["Kharif"],
      description: "Requires hot climate and moderate rainfall",
      icon: <FaLeaf />,
      suitability: 0
    },
    {
      name: "Sugarcane",
      temperature: { min: 20, max: 35, optimal: 30 },
      humidity: { min: 60, max: 85, optimal: 75 },
      rainfall: { min: 1000, max: 1500, optimal: 1250 },
      season: ["Year-round"],
      description: "Tropical crop, requires long warm season",
      icon: <FaTree />,
      suitability: 0
    },
    {
      name: "Potato",
      temperature: { min: 10, max: 25, optimal: 18 },
      humidity: { min: 60, max: 80, optimal: 70 },
      rainfall: { min: 500, max: 700, optimal: 600 },
      season: ["Rabi", "Kharif"],
      description: "Cool climate crop, frost sensitive",
      icon: <FaSeedling />,
      suitability: 0
    },
    {
      name: "Tomato",
      temperature: { min: 15, max: 30, optimal: 25 },
      humidity: { min: 50, max: 70, optimal: 60 },
      rainfall: { min: 600, max: 900, optimal: 750 },
      season: ["Year-round"],
      description: "Versatile crop, needs warm temperatures",
      icon: <FaLeaf />,
      suitability: 0
    },
    {
      name: "Soybean",
      temperature: { min: 20, max: 30, optimal: 25 },
      humidity: { min: 50, max: 80, optimal: 65 },
      rainfall: { min: 500, max: 1000, optimal: 750 },
      season: ["Kharif"],
      description: "Warm season legume, requires moderate moisture",
      icon: <FaSeedling />,
      suitability: 0
    },
    {
      name: "Barley",
      temperature: { min: 12, max: 25, optimal: 18 },
      humidity: { min: 40, max: 60, optimal: 50 },
      rainfall: { min: 300, max: 600, optimal: 450 },
      season: ["Rabi"],
      description: "Cool season cereal, drought tolerant",
      icon: <FaLeaf />,
      suitability: 0
    },
    {
      name: "Millets",
      temperature: { min: 25, max: 35, optimal: 30 },
      humidity: { min: 30, max: 50, optimal: 40 },
      rainfall: { min: 300, max: 500, optimal: 400 },
      season: ["Kharif"],
      description: "Drought resistant, grows in poor soils",
      icon: <FaTree />,
      suitability: 0
    }
  ];

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

  // Calculate crop suitability based on weather
  const calculateCropSuitability = (weatherData) => {
    if (!weatherData) return [];

    const temperature = weatherData.temp;
    const humidity = weatherData.humidity;
    const rainfall = weatherData.pressure; // Using pressure as proxy for rainfall tendency

    const recommendations = cropDatabase.map(crop => {
      let suitability = 0;

      // Temperature suitability (40% weight)
      if (temperature >= crop.temperature.min && temperature <= crop.temperature.max) {
        const tempDiff = Math.abs(temperature - crop.temperature.optimal);
        const tempRange = crop.temperature.max - crop.temperature.min;
        const tempScore = Math.max(0, 40 - (tempDiff / tempRange) * 40);
        suitability += tempScore;
      }

      // Humidity suitability (30% weight)
      if (humidity >= crop.humidity.min && humidity <= crop.humidity.max) {
        const humidityDiff = Math.abs(humidity - crop.humidity.optimal);
        const humidityRange = crop.humidity.max - crop.humidity.min;
        const humidityScore = Math.max(0, 30 - (humidityDiff / humidityRange) * 30);
        suitability += humidityScore;
      }

      // Rainfall suitability (30% weight) - using pressure as indicator
      const rainfallIndicator = 1000 - rainfall; // Convert pressure to rainfall indicator
      const rainfallScore = Math.max(0, 30 - Math.abs(rainfallIndicator - crop.rainfall.optimal) / 100);
      suitability += Math.min(30, rainfallScore);

      return {
        ...crop,
        suitability: Math.round(suitability),
        temperatureMatch: `${Math.round(temperature)}°C vs optimal ${crop.temperature.optimal}°C`,
        humidityMatch: `${humidity}% vs optimal ${crop.humidity.optimal}%`
      };
    });

    // Sort by suitability and return top 5
    return recommendations
      .sort((a, b) => b.suitability - a.suitability)
      .slice(0, 5);
  };

  // Get crop recommendations
  const getCropRecommendations = () => {
    if (!weather) {
      alert('Please get weather data first');
      return;
    }

    setCropLoading(true);
    setCropRecommendations(null);

    const recommendations = calculateCropSuitability(weather);

    setTimeout(() => {
      setCropRecommendations({
        success: true,
        crops: recommendations,
        weatherConditions: {
          temperature: Math.round(weather.temp),
          humidity: Math.round(weather.humidity),
          location: weather.name
        }
      });
      setCropLoading(false);
      setActiveTab('crops');
    }, 1000);
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

  const getSuitabilityColor = (score) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    if (score >= 40) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  const getSuitabilityText = (score) => {
    if (score >= 80) return 'Highly Suitable';
    if (score >= 60) return 'Moderately Suitable';
    if (score >= 40) return 'Marginally Suitable';
    return 'Not Suitable';
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
          <h1 className="page-title">🌦 Weather Intelligence + Crop Advisor</h1>
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
                      <FaSearch /> Get Weather
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
                    className={`tab-btn ${activeTab === 'weather' ? 'active' : ''}`}
                    onClick={() => setActiveTab('weather')}
                  >
                    Current Weather
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'forecast' ? 'active' : ''}`}
                    onClick={() => setActiveTab('forecast')}
                  >
                    5-Day Forecast
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'crops' ? 'active' : ''}`}
                    onClick={() => setActiveTab('crops')}
                  >
                    <FaSeedling /> Crop Recommendations
                  </button>
                </div>

                {/* Current Weather Tab */}
                {activeTab === 'weather' && (
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

                      {/* Get Crop Recommendations Button */}
                      <div className="crop-advice-cta">
                        <h3><FaSeedling /> Get Smart Crop Recommendations</h3>
                        <p>Based on current weather conditions:</p>
                        <div className="weather-summary">
                          <div className="summary-item">
                            <span className="label">Location:</span>
                            <span className="value">{weather.name}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Temperature:</span>
                            <span className="value">{weather.temp}°C</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Humidity:</span>
                            <span className="value">{weather.humidity}%</span>
                          </div>
                        </div>
                        <button 
                          onClick={getCropRecommendations}
                          disabled={cropLoading}
                          className="btn btn-crop-advice"
                        >
                          {cropLoading ? (
                            <>
                              <FaSpinner className="spinner" /> Analyzing...
                            </>
                          ) : (
                            <>
                              <FaArrowRight /> Get Crop Recommendations
                            </>
                          )}
                        </button>
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

                {/* Crop Recommendations Tab */}
                {activeTab === 'crops' && weather && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="crop-recommendations"
                  >
                    <h3 className="crop-title">
                      <FaSeedling /> Crop Recommendations for {weather.name}
                    </h3>
                    
                    <div className="weather-summary-card">
                      <div className="summary-item">
                        <span className="summary-label">Current Temperature:</span>
                        <span className="summary-value">{weather.temp}°C</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Humidity:</span>
                        <span className="summary-value">{weather.humidity}%</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Weather Condition:</span>
                        <span className="summary-value">{weather.description}</span>
                      </div>
                    </div>

                    {cropRecommendations ? (
                      <div className="crop-grid">
                        {cropRecommendations.crops.map((crop, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="crop-card"
                            style={{
                              borderLeft: `5px solid ${getSuitabilityColor(crop.suitability)}`
                            }}
                          >
                            <div className="crop-header">
                              <div className="crop-icon">
                                {crop.icon}
                              </div>
                              <div className="crop-name">
                                <h4>{crop.name}</h4>
                                <span className="crop-season">{crop.season.join(', ')} Season</span>
                              </div>
                              <div className="suitability-score" style={{ color: getSuitabilityColor(crop.suitability) }}>
                                <div className="score-number">{crop.suitability}%</div>
                                <div className="score-text">{getSuitabilityText(crop.suitability)}</div>
                              </div>
                            </div>
                            
                            <div className="crop-description">
                              {crop.description}
                            </div>
                            
                            <div className="crop-requirements">
                              <div className="requirement">
                                <FaThermometerHalf className="requirement-icon" />
                                <span>{crop.temperatureMatch}</span>
                              </div>
                              <div className="requirement">
                                <FaTint className="requirement-icon" />
                                <span>{crop.humidityMatch}</span>
                              </div>
                            </div>
                            
                            <div className="crop-details">
                              <div className="detail">
                                <span className="detail-label">Optimal Temp:</span>
                                <span className="detail-value">{crop.temperature.optimal}°C</span>
                              </div>
                              <div className="detail">
                                <span className="detail-label">Optimal Humidity:</span>
                                <span className="detail-value">{crop.humidity.optimal}%</span>
                              </div>
                              <div className="detail">
                                <span className="detail-label">Rainfall:</span>
                                <span className="detail-value">{crop.rainfall.optimal}mm</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-recommendations">
                        <p>Click "Get Crop Recommendations" in the Weather tab to see recommendations based on current conditions.</p>
                      </div>
                    )}

                    <div className="crop-tips">
                      <h4>🌱 Farming Tips for Current Weather</h4>
                      <ul>
                        {weather.temp > 30 && (
                          <li>High temperature detected: Consider heat-tolerant crops like millets or cotton</li>
                        )}
                        {weather.humidity > 70 && (
                          <li>High humidity: Watch for fungal diseases, ensure proper ventilation</li>
                        )}
                        {weather.humidity < 40 && (
                          <li>Low humidity: Increase irrigation frequency, use mulch to retain soil moisture</li>
                        )}
                        {weather.windSpeed > 5 && (
                          <li>Windy conditions: Provide windbreaks, support for tall crops</li>
                        )}
                        <li>Check local soil conditions and water availability before planting</li>
                        <li>Consult local agricultural experts for region-specific advice</li>
                      </ul>
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

        /* ... (keep all existing weather styles from WeatherOnly.js) ... */

        /* Crop Recommendations Styles */
        .crop-recommendations {
          margin-top: 1rem;
        }

        .crop-title {
          color: #333;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
        }

        .weather-summary-card {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
        }

        .summary-label {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .summary-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .crop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .crop-card {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .crop-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .crop-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .crop-icon {
          font-size: 2rem;
          color: #10B981;
        }

        .crop-name h4 {
          margin: 0;
          font-size: 1.3rem;
          color: #333;
        }

        .crop-season {
          font-size: 0.8rem;
          color: #666;
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .suitability-score {
          margin-left: auto;
          text-align: center;
        }

        .score-number {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .score-text {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .crop-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .crop-requirements {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .requirement {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.5rem 0;
          color: #555;
        }

        .requirement-icon {
          color: #667eea;
        }

        .crop-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .detail {
          text-align: center;
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .detail-label {
          display: block;
          color: #666;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          display: block;
          font-weight: 600;
          color: #333;
        }

        .no-recommendations {
          text-align: center;
          padding: 3rem;
          color: #666;
          background: #f8f9fa;
          border-radius: 15px;
          margin-bottom: 2rem;
        }

        .crop-advice-cta {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          margin-top: 2rem;
        }

        .crop-advice-cta h3 {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .crop-advice-cta p {
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .weather-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 10px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-item .label {
          font-weight: 500;
          opacity: 0.9;
        }

        .summary-item .value {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .btn-crop-advice {
          background: white;
          color: #4CAF50;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          width: 100%;
        }

        .btn-crop-advice:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .crop-tips {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-radius: 15px;
          padding: 1.5rem;
          border-left: 5px solid #F59E0B;
        }

        .crop-tips h4 {
          color: #92400E;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .crop-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .crop-tips li {
          color: #78350F;
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .crop-tips li:before {
          content: "•";
          color: #F59E0B;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
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
          
          .crop-grid {
            grid-template-columns: 1fr;
          }
          
          .crop-details {
            grid-template-columns: 1fr;
          }
          
          .weather-summary-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default WeatherWithCrops;