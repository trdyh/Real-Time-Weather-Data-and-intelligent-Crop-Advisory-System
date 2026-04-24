import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  FaSeedling,
  FaSpinner,
  FaCheck,
  FaInfoCircle,
  FaArrowRight,
  FaMountain,
  FaWater,
  FaTree,
  FaLeaf
} from 'react-icons/fa';

const Weather = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('current');
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

  // Location-based crop recommendation logic
  const recommendCropsByLocation = ({ location, temperature, humidity, rainfall }) => {
    const crops = [];
    const loc = location.toLowerCase();

    // Coastal regions
    if (
      loc.includes('kerala') ||
      loc.includes('tamil nadu') ||
      loc.includes('goa') ||
      loc.includes('mumbai') ||
      loc.includes('chennai') ||
      loc.includes('coastal') ||
      loc.includes('andhra') ||
      loc.includes('orissa') ||
      loc.includes('west bengal')
    ) {
      if (humidity > 60) {
        crops.push(
          { 
            name: 'Rice', 
            reason: 'High humidity and coastal climate ideal for paddy cultivation',
            icon: '🌾',
            region: 'Coastal',
            idealTemp: '20-30°C',
            idealHumidity: '>60%',
            idealRainfall: '1000-2500 mm'
          },
          { 
            name: 'Coconut', 
            reason: 'Thrives in coastal regions with sandy soil',
            icon: '🥥',
            region: 'Coastal',
            idealTemp: '25-35°C',
            idealHumidity: '60-90%',
            idealRainfall: '1000-3000 mm'
          },
          { 
            name: 'Banana', 
            reason: 'Warm and humid conditions with good drainage',
            icon: '🍌',
            region: 'Coastal',
            idealTemp: '20-35°C',
            idealHumidity: '>60%',
            idealRainfall: '1500-2500 mm'
          },
          { 
            name: 'Cashew', 
            reason: 'Tropical coastal climate crop',
            icon: '🥜',
            region: 'Coastal',
            idealTemp: '20-35°C',
            idealHumidity: '60-80%',
            idealRainfall: '1000-2000 mm'
          }
        );
      }
    }

    // Dry / Semi-arid regions
    if (
      loc.includes('rajasthan') ||
      loc.includes('telangana') ||
      loc.includes('karnataka') ||
      loc.includes('dry') ||
      loc.includes('arid') ||
      loc.includes('gujarat') ||
      loc.includes('maharashtra') ||
      loc.includes('andhra pradesh')
    ) {
      if (rainfall < 50) {
        crops.push(
          { 
            name: 'Millets', 
            reason: 'Low water requirement and drought resistant',
            icon: '🌾',
            region: 'Dry/Arid',
            idealTemp: '25-35°C',
            idealHumidity: '<50%',
            idealRainfall: '300-500 mm'
          },
          { 
            name: 'Pulses', 
            reason: 'Drought resistant crops with short duration',
            icon: '🌱',
            region: 'Dry/Arid',
            idealTemp: '15-30°C',
            idealHumidity: '40-70%',
            idealRainfall: '400-600 mm'
          },
          { 
            name: 'Cotton', 
            reason: 'Suitable for dry climates with irrigation',
            icon: '🧵',
            region: 'Dry/Arid',
            idealTemp: '21-37°C',
            idealHumidity: '<70%',
            idealRainfall: '500-800 mm'
          },
          { 
            name: 'Groundnut', 
            reason: 'Deep-rooted crop suitable for dry regions',
            icon: '🥜',
            region: 'Dry/Arid',
            idealTemp: '25-35°C',
            idealHumidity: '50-70%',
            idealRainfall: '500-700 mm'
          }
        );
      }
    }

    // Fertile plains
    if (
      loc.includes('punjab') ||
      loc.includes('haryana') ||
      loc.includes('uttar pradesh') ||
      loc.includes('plains') ||
      loc.includes('fertile') ||
      loc.includes('bihar') ||
      loc.includes('uttarakhand') ||
      loc.includes('west bengal')
    ) {
      if (temperature >= 15 && temperature <= 30) {
        crops.push(
          { 
            name: 'Wheat', 
            reason: 'Cool to moderate temperature with fertile soil',
            icon: '🌾',
            region: 'Plains',
            idealTemp: '15-25°C',
            idealHumidity: '<60%',
            idealRainfall: '500-750 mm'
          },
          { 
            name: 'Sugarcane', 
            reason: 'Fertile soil and irrigation facilities available',
            icon: '🎋',
            region: 'Plains',
            idealTemp: '20-35°C',
            idealHumidity: '60-85%',
            idealRainfall: '1000-1500 mm'
          },
          { 
            name: 'Rice', 
            reason: 'Plenty of water availability in plains',
            icon: '🌾',
            region: 'Plains',
            idealTemp: '20-35°C',
            idealHumidity: '>70%',
            idealRainfall: '1000-2000 mm'
          },
          { 
            name: 'Maize', 
            reason: 'Well-suited for plains with good soil',
            icon: '🌽',
            region: 'Plains',
            idealTemp: '18-32°C',
            idealHumidity: '50-70%',
            idealRainfall: '600-900 mm'
          }
        );
      }
    }

    // Hilly regions
    if (
      loc.includes('himachal') ||
      loc.includes('uttarakhand') ||
      loc.includes('hills') ||
      loc.includes('mountain') ||
      loc.includes('jammu') ||
      loc.includes('kashmir') ||
      loc.includes('northeast') ||
      loc.includes('assam') ||
      loc.includes('sikkim')
    ) {
      crops.push(
        { 
          name: 'Apple', 
          reason: 'Cool climate crop requiring chilling hours',
          icon: '🍎',
          region: 'Hilly',
          idealTemp: '10-20°C',
          idealHumidity: '60-80%',
          idealRainfall: '800-1200 mm'
        },
        { 
          name: 'Potato', 
          reason: 'Grows well in hilly regions with cool nights',
          icon: '🥔',
          region: 'Hilly',
          idealTemp: '15-25°C',
          idealHumidity: '50-80%',
          idealRainfall: '500-700 mm'
        },
        { 
          name: 'Barley', 
          reason: 'Cold tolerant crop for higher altitudes',
          icon: '🌾',
          region: 'Hilly',
          idealTemp: '12-25°C',
          idealHumidity: '30-65%',
          idealRainfall: '400-600 mm'
        },
        { 
          name: 'Tea', 
          reason: 'Thrives in hilly regions with rainfall',
          icon: '🍵',
          region: 'Hilly',
          idealTemp: '15-30°C',
          idealHumidity: '70-90%',
          idealRainfall: '1500-3000 mm'
        }
      );
    }

    // Tropical regions fallback
    if (crops.length === 0) {
      if (temperature > 25 && humidity > 50) {
        crops.push(
          { 
            name: 'Maize', 
            reason: 'Adaptable to tropical climate',
            icon: '🌽',
            region: 'Tropical',
            idealTemp: '18-32°C',
            idealHumidity: '50-70%',
            idealRainfall: '600-900 mm'
          },
          { 
            name: 'Groundnut', 
            reason: 'Warm weather crop with moderate water needs',
            icon: '🥜',
            region: 'Tropical',
            idealTemp: '25-35°C',
            idealHumidity: '50-70%',
            idealRainfall: '500-700 mm'
          },
          { 
            name: 'Vegetables', 
            reason: 'Various vegetables suitable for tropical climate',
            icon: '🥬',
            region: 'Tropical',
            idealTemp: '15-30°C',
            idealHumidity: '40-80%',
            idealRainfall: '500-1000 mm'
          }
        );
      }
    }

    // Add fallback crops if still none found
    if (crops.length === 0) {
      crops.push(
        { 
          name: 'Pulses', 
          reason: 'Adaptable to various conditions with nitrogen fixation',
          icon: '🌱',
          region: 'General',
          idealTemp: '15-30°C',
          idealHumidity: '40-70%',
          idealRainfall: '400-600 mm'
        },
        { 
          name: 'Vegetables', 
          reason: 'Suitable for current conditions with proper care',
          icon: '🥬',
          region: 'General',
          idealTemp: '15-30°C',
          idealHumidity: '40-80%',
          idealRainfall: '500-1000 mm'
        },
        { 
          name: 'Millets', 
          reason: 'Climate resilient and nutrition rich',
          icon: '🌾',
          region: 'General',
          idealTemp: '25-35°C',
          idealHumidity: '30-50%',
          idealRainfall: '300-500 mm'
        }
      );
    }

    return crops;
  };

  // Soil-based crop recommendation logic
  const recommendCropsBySoil = ({ soilType, temperature, rainfall }) => {
    let crops = [];

    switch (soilType.toLowerCase()) {
      case 'alluvial':
        crops = [
          { 
            name: 'Rice', 
            reason: 'High fertility and good water retention for paddy',
            icon: '🌾',
            soilType: 'Alluvial',
            idealTemp: '20-35°C',
            idealRainfall: '1000-2500 mm'
          },
          { 
            name: 'Wheat', 
            reason: 'Ideal nutrient-rich soil for wheat cultivation',
            icon: '🌾',
            soilType: 'Alluvial',
            idealTemp: '15-25°C',
            idealRainfall: '500-750 mm'
          },
          { 
            name: 'Sugarcane', 
            reason: 'Requires fertile soil with good moisture',
            icon: '🎋',
            soilType: 'Alluvial',
            idealTemp: '20-35°C',
            idealRainfall: '1000-1500 mm'
          },
          { 
            name: 'Maize', 
            reason: 'Well-drained and fertile alluvial soil',
            icon: '🌽',
            soilType: 'Alluvial',
            idealTemp: '18-32°C',
            idealRainfall: '600-900 mm'
          },
          { 
            name: 'Barley', 
            reason: 'Suitable for light alluvial soils',
            icon: '🌾',
            soilType: 'Alluvial',
            idealTemp: '12-25°C',
            idealRainfall: '400-600 mm'
          }
        ];
        break;

      case 'black':
        crops = [
          { 
            name: 'Cotton', 
            reason: 'High moisture retention ideal for cotton',
            icon: '🧵',
            soilType: 'Black',
            idealTemp: '21-37°C',
            idealRainfall: '500-800 mm'
          },
          { 
            name: 'Soybean', 
            reason: 'Clay-rich soil provides good support',
            icon: '🌱',
            soilType: 'Black',
            idealTemp: '20-30°C',
            idealRainfall: '600-800 mm'
          },
          { 
            name: 'Groundnut', 
            reason: 'Performs well in deep black soil',
            icon: '🥜',
            soilType: 'Black',
            idealTemp: '25-35°C',
            idealRainfall: '500-700 mm'
          },
          { 
            name: 'Sugarcane', 
            reason: 'Moisture-holding capacity benefits sugarcane',
            icon: '🎋',
            soilType: 'Black',
            idealTemp: '20-35°C',
            idealRainfall: '1000-1500 mm'
          },
          { 
            name: 'Wheat', 
            reason: 'Good for wheat in winter season',
            icon: '🌾',
            soilType: 'Black',
            idealTemp: '15-25°C',
            idealRainfall: '500-750 mm'
          }
        ];
        break;

      case 'red':
        crops = [
          { 
            name: 'Millets', 
            reason: 'Low water requirement suits red soil',
            icon: '🌾',
            soilType: 'Red',
            idealTemp: '25-35°C',
            idealRainfall: '300-500 mm'
          },
          { 
            name: 'Pulses', 
            reason: 'Nitrogen-fixing crops improve soil fertility',
            icon: '🌱',
            soilType: 'Red',
            idealTemp: '15-30°C',
            idealRainfall: '400-600 mm'
          },
          { 
            name: 'Groundnut', 
            reason: 'Grows well in low fertility red soil',
            icon: '🥜',
            soilType: 'Red',
            idealTemp: '25-35°C',
            idealRainfall: '500-700 mm'
          },
          { 
            name: 'Potato', 
            reason: 'Adaptable to various soil types including red',
            icon: '🥔',
            soilType: 'Red',
            idealTemp: '15-25°C',
            idealRainfall: '500-700 mm'
          },
          { 
            name: 'Tobacco', 
            reason: 'Thrives in well-drained red soils',
            icon: '🌿',
            soilType: 'Red',
            idealTemp: '20-30°C',
            idealRainfall: '500-800 mm'
          }
        ];
        break;

      case 'laterite':
        crops = [
          { 
            name: 'Tea', 
            reason: 'Thrives in acidic laterite soil',
            icon: '🍵',
            soilType: 'Laterite',
            idealTemp: '15-30°C',
            idealRainfall: '1500-3000 mm'
          },
          { 
            name: 'Coffee', 
            reason: 'Well-drained laterite soil with organic matter',
            icon: '☕',
            soilType: 'Laterite',
            idealTemp: '15-25°C',
            idealRainfall: '1500-2500 mm'
          },
          { 
            name: 'Cashew', 
            reason: 'Low nutrient requirement suitable for laterite',
            icon: '🥜',
            soilType: 'Laterite',
            idealTemp: '20-35°C',
            idealRainfall: '1000-2000 mm'
          },
          { 
            name: 'Rubber', 
            reason: 'Laterite soil with good drainage',
            icon: '🌳',
            soilType: 'Laterite',
            idealTemp: '25-35°C',
            idealRainfall: '2000-3000 mm'
          },
          { 
            name: 'Pepper', 
            reason: 'Suitable for laterite soils with support',
            icon: '🌶️',
            soilType: 'Laterite',
            idealTemp: '20-35°C',
            idealRainfall: '1500-2500 mm'
          }
        ];
        break;

      case 'sandy':
        crops = [
          { 
            name: 'Groundnut', 
            reason: 'Fast drainage suitable for groundnut',
            icon: '🥜',
            soilType: 'Sandy',
            idealTemp: '25-35°C',
            idealRainfall: '500-700 mm'
          },
          { 
            name: 'Watermelon', 
            reason: 'Requires loose sandy soil for root development',
            icon: '🍉',
            soilType: 'Sandy',
            idealTemp: '25-35°C',
            idealRainfall: '400-600 mm'
          },
          { 
            name: 'Carrot', 
            reason: 'Root development is better in sandy soil',
            icon: '🥕',
            soilType: 'Sandy',
            idealTemp: '15-25°C',
            idealRainfall: '500-700 mm'
          },
          { 
            name: 'Cucumber', 
            reason: 'Light soil preference for cucumber',
            icon: '🥒',
            soilType: 'Sandy',
            idealTemp: '25-35°C',
            idealRainfall: '600-800 mm'
          },
          { 
            name: 'Pumpkin', 
            reason: 'Sandy loam soil ideal for pumpkin',
            icon: '🎃',
            soilType: 'Sandy',
            idealTemp: '20-30°C',
            idealRainfall: '500-700 mm'
          }
        ];
        break;

      case 'clayey':
        crops = [
          { 
            name: 'Rice', 
            reason: 'Water retention helps paddy cultivation',
            icon: '🌾',
            soilType: 'Clayey',
            idealTemp: '20-35°C',
            idealRainfall: '1000-2500 mm'
          },
          { 
            name: 'Jute', 
            reason: 'Waterlogged soil ideal for jute',
            icon: '🌿',
            soilType: 'Clayey',
            idealTemp: '25-35°C',
            idealRainfall: '1500-2500 mm'
          },
          { 
            name: 'Sugarcane', 
            reason: 'High water demand crop for clay soil',
            icon: '🎋',
            soilType: 'Clayey',
            idealTemp: '20-35°C',
            idealRainfall: '1000-1500 mm'
          },
          { 
            name: 'Wheat', 
            reason: 'Heavy soil with good moisture for wheat',
            icon: '🌾',
            soilType: 'Clayey',
            idealTemp: '15-25°C',
            idealRainfall: '500-750 mm'
          }
        ];
        break;

      case 'loamy':
        crops = [
          { 
            name: 'Wheat', 
            reason: 'Balanced soil texture ideal for wheat',
            icon: '🌾',
            soilType: 'Loamy',
            idealTemp: '15-25°C',
            idealRainfall: '500-750 mm'
          },
          { 
            name: 'Vegetables', 
            reason: 'Best soil for most vegetable cultivation',
            icon: '🥬',
            soilType: 'Loamy',
            idealTemp: '15-30°C',
            idealRainfall: '500-1000 mm'
          },
          { 
            name: 'Fruits', 
            reason: 'Good aeration and fertility for fruit trees',
            icon: '🍎',
            soilType: 'Loamy',
            idealTemp: '15-30°C',
            idealRainfall: '800-1500 mm'
          },
          { 
            name: 'Pulses', 
            reason: 'Optimal nutrient balance for pulses',
            icon: '🌱',
            soilType: 'Loamy',
            idealTemp: '15-30°C',
            idealRainfall: '400-600 mm'
          },
          { 
            name: 'Maize', 
            reason: 'Well-drained loam soil perfect for maize',
            icon: '🌽',
            soilType: 'Loamy',
            idealTemp: '18-32°C',
            idealRainfall: '600-900 mm'
          }
        ];
        break;

      default:
        crops = [
          { 
            name: 'Millets', 
            reason: 'Hardy crop suitable for uncertain soil conditions',
            icon: '🌾',
            soilType: 'General',
            idealTemp: '25-35°C',
            idealRainfall: '300-500 mm'
          },
          { 
            name: 'Pulses', 
            reason: 'Adaptable to various soil types',
            icon: '🌱',
            soilType: 'General',
            idealTemp: '15-30°C',
            idealRainfall: '400-600 mm'
          }
        ];
    }

    // Weather-based filtering
    if (temperature > 35) {
      crops = crops.filter(c =>
        !['Wheat', 'Potato', 'Barley'].includes(c.name)
      );
    }

    if (rainfall < 40) {
      crops = crops.filter(c =>
        !['Rice', 'Sugarcane', 'Jute'].includes(c.name)
      );
    }

    if (temperature < 10) {
      crops = crops.filter(c =>
        !['Groundnut', 'Cotton', 'Maize'].includes(c.name)
      );
    }

    return crops;
  };

  // Get crop recommendations
  const getCropRecommendations = () => {
    if (!weather) {
      setError('Please get weather data first');
      return;
    }

    setCropLoading(true);
    setCropRecommendations(null);

    const { temperature, humidity, location } = weather;
    const rainfall = weather.rainfall || 50; // Default if not available
    
    let crops = [];

    if (recommendationType === 'location') {
      crops = recommendCropsByLocation({
        location,
        temperature,
        humidity,
        rainfall
      });
    } else {
      crops = recommendCropsBySoil({
        soilType,
        temperature,
        rainfall
      });
    }

    // Add match percentage
    const cropsWithInfo = crops.map(crop => ({
      ...crop,
      matchPercentage: calculateMatchPercentage(crop, temperature, humidity, rainfall),
      recommendationType: recommendationType
    }));

    setTimeout(() => {
      setCropRecommendations({
        success: true,
        crops: cropsWithInfo,
        weatherConditions: {
          temperature: Math.round(temperature),
          humidity: Math.round(humidity),
          rainfall: rainfall,
          soilType: soilType,
          location: location
        },
        recommendationType: recommendationType,
        timestamp: new Date().toLocaleString()
      });
      setCropLoading(false);
    }, 1000);
  };

  // Calculate match percentage
  const calculateMatchPercentage = (crop, temp, humidity, rainfall) => {
    let score = 70; // Base score
    
    // Temperature scoring based on crop type
    const tempRanges = {
      'Rice': [20, 30],
      'Wheat': [15, 25],
      'Maize': [18, 32],
      'Cotton': [21, 37],
      'Sugarcane': [20, 35],
      'Millets': [25, 35],
      'Groundnut': [25, 35],
      'Potato': [15, 25],
      'Apple': [10, 20],
      'Barley': [12, 25],
      'Tea': [15, 30],
      'Coffee': [15, 25],
      'Coconut': [25, 35],
      'Banana': [20, 35],
      'Cashew': [20, 35],
      'Soybean': [20, 30],
      'Pulses': [15, 30],
      'Vegetables': [15, 30],
      'Fruits': [15, 30],
      'Jute': [25, 35],
      'Tobacco': [20, 30],
      'Rubber': [25, 35],
      'Pepper': [20, 35],
      'Pumpkin': [20, 30],
      'Carrot': [15, 25],
      'Cucumber': [25, 35],
      'Watermelon': [25, 35]
    };

    if (tempRanges[crop.name]) {
      const [min, max] = tempRanges[crop.name];
      if (temp >= min && temp <= max) {
        score += 15;
        if (Math.abs(temp - (min + max) / 2) <= 5) {
          score += 5; // Bonus for being near optimal
        }
      }
    }

    // Soil bonus (for soil-based recommendations)
    if (crop.soilType && crop.soilType.toLowerCase() === soilType.toLowerCase()) {
      score += 10;
    }

    // Region bonus (for location-based recommendations)
    if (crop.region) {
      const locationLower = weather?.location?.toLowerCase() || '';
      if (crop.region === 'Coastal' && locationLower.includes('coastal')) score += 5;
      if (crop.region === 'Dry/Arid' && (locationLower.includes('dry') || locationLower.includes('arid'))) score += 5;
      if (crop.region === 'Plains' && locationLower.includes('plains')) score += 5;
      if (crop.region === 'Hilly' && (locationLower.includes('hilly') || locationLower.includes('mountain'))) score += 5;
    }

    // Humidity bonus
    if (crop.name === 'Rice' && humidity > 60) score += 5;
    if (crop.name === 'Wheat' && humidity < 60) score += 5;
    if (crop.name === 'Cotton' && humidity < 70) score += 5;
    if (crop.name === 'Tea' && humidity > 70) score += 5;

    return Math.min(95, Math.max(60, score));
  };

  // Get weather data
  const getWeather = async (e) => {
    e?.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setCropRecommendations(null);

    try {
      // Determine region based on city
      let region = 'General';
      let temp = 25;
      let humidity = 60;
      let rainfall = 50;
      
      const cityLower = city.toLowerCase();
      
      if (cityLower.includes('mumbai') || cityLower.includes('goa') || 
          cityLower.includes('chennai') || cityLower.includes('kerala') ||
          cityLower.includes('andhra') || cityLower.includes('kolkata')) {
        region = 'Coastal';
        temp = 28;
        humidity = 78;
        rainfall = 60;
      } else if (cityLower.includes('rajasthan') || cityLower.includes('telangana') ||
                cityLower.includes('gujarat') || cityLower.includes('ahmedabad')) {
        region = 'Dry/Arid';
        temp = 35;
        humidity = 40;
        rainfall = 10;
      } else if (cityLower.includes('punjab') || cityLower.includes('haryana') ||
                cityLower.includes('uttar pradesh') || cityLower.includes('delhi') ||
                cityLower.includes('lucknow')) {
        region = 'Plains';
        temp = 22;
        humidity = 55;
        rainfall = 35;
      } else if (cityLower.includes('himachal') || cityLower.includes('uttarakhand') ||
                cityLower.includes('shimla') || cityLower.includes('nainital') ||
                cityLower.includes('darjeeling')) {
        region = 'Hilly';
        temp = 18;
        humidity = 65;
        rainfall = 45;
      }

      const weatherData = {
        temperature: temp,
        humidity: humidity,
        rainfall: rainfall,
        location: `${city}, ${region} Region`,
        description: getWeatherDescription(temp, humidity, region),
        icon: getWeatherIcon(temp, humidity, region),
        feels_like: temp + 2,
        temp_min: temp - 3,
        temp_max: temp + 3,
        windSpeed: 3.5,
        pressure: 1013,
        visibility: 10000,
        sunrise: 1673942400,
        sunset: 1673985600,
        region: region
      };
      
      setWeather(weatherData);

      // Save to recent searches
      const search = {
        city: city,
        temp: Math.round(temp),
        icon: weatherData.icon,
        timestamp: new Date().toLocaleTimeString(),
        location: weatherData.location,
        region: region
      };

      setRecentSearches(prev => {
        const filtered = prev.filter(s => s.city.toLowerCase() !== city.toLowerCase());
        const updated = [search, ...filtered.slice(0, 4)];
        localStorage.setItem('recentWeatherSearches', JSON.stringify(updated));
        return updated;
      });

      // Generate forecast
      const forecastData = {
        success: true,
        city: { name: city, region: region },
        forecast: generateForecast(temp, humidity, region)
      };
      
      setForecast(forecastData);

    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for weather data
  const getWeatherDescription = (temp, humidity, region) => {
    if (region === 'Coastal') return 'humid and warm';
    if (region === 'Dry/Arid') return 'hot and dry';
    if (region === 'Plains') return 'pleasant and clear';
    if (region === 'Hilly') return 'cool and breezy';
    return 'partly cloudy';
  };

  const getWeatherIcon = (temp, humidity, region) => {
    if (region === 'Coastal' && humidity > 70) return '10d';
    if (region === 'Dry/Arid') return '01d';
    if (region === 'Hilly') return '03d';
    return '02d';
  };

  const generateForecast = (temp, humidity, region) => {
    const days = [];
    const baseTemp = temp;
    const baseHumidity = humidity;
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(Date.now() + i * 86400000);
      const dayTemp = baseTemp + (Math.random() * 4 - 2);
      const dayHumidity = baseHumidity + (Math.random() * 20 - 10);
      
      days.push({
        date: date.toISOString().split('T')[0],
        temp: { 
          avg: Math.round(dayTemp),
          min: Math.round(dayTemp - 3),
          max: Math.round(dayTemp + 3)
        },
        weather: {
          description: getWeatherDescription(dayTemp, dayHumidity, region),
          icon: getWeatherIcon(dayTemp, dayHumidity, region)
        },
        humidity: Math.max(30, Math.min(90, Math.round(dayHumidity))),
        windSpeed: (3 + Math.random() * 2).toFixed(1)
      });
    }
    
    return days;
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // For demo, use default values
            const weatherData = {
              temperature: 22,
              humidity: 70,
              rainfall: 25,
              location: 'Your Current Location, General Region',
              description: 'clear sky',
              icon: '01d',
              feels_like: 23,
              temp_min: 20,
              temp_max: 25,
              windSpeed: 2.5,
              pressure: 1015,
              visibility: 10000,
              sunrise: 1673942400,
              sunset: 1673985600,
              region: 'General'
            };
            
            setWeather(weatherData);
            setCity('Current Location');
            setError('');
            
            // Generate forecast
            setForecast({
              success: true,
              city: { name: 'Your Location' },
              forecast: generateForecast(22, 70, 'General')
            });
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
        <h1 className="page-title">🌦 Real-time Weather & Smart Crop Advisor</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="weather-container"
        >
          {/* Search Section */}
          <div className="weather-search-section">
            <form onSubmit={getWeather} className="weather-search-form">
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name (e.g., Mumbai, Rajasthan, Punjab, Kerala)..."
                  className="search-input"
                />
              </div>
              <div className="search-buttons">
                <button type="submit" className="btn btn-search" disabled={loading}>
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
            </form>

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
                      <div className="recent-region">{search.region || 'General'}</div>
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
                  <button
                    className={`tab-btn ${activeTab === 'crops' ? 'active' : ''}`}
                    onClick={() => setActiveTab('crops')}
                  >
                    <FaSeedling /> Crop Recommendations
                  </button>
                </div>

                {/* Current Weather Tab */}
                {activeTab === 'current' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="current-weather"
                  >
                    <div className="current-weather-header">
                      <div className="location-info">
                        <h2 className="location">
                          <FaMapMarkerAlt /> {weather.location}
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
                          {Math.round(weather.temperature)}°C
                        </div>
                        <div className="temp-feels">
                          Feels like {Math.round(weather.feels_like)}°C
                        </div>
                      </div>
                      <div className="weather-icon-large">
                        {weatherIcons[weather.icon] || <FaCloud />}
                      </div>
                    </div>

                    <div className="weather-stats-grid">
                      <div className="stat-card">
                        <FaThermometerHalf className="stat-icon" />
                        <div className="stat-content">
                          <div className="stat-label">Temperature</div>
                          <div className="stat-value">
                            {Math.round(weather.temperature)}°C
                          </div>
                          <div className="stat-range">
                            H: {Math.round(weather.temp_max)}° L: {Math.round(weather.temp_min)}°C
                          </div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <FaTint className="stat-icon" />
                        <div className="stat-content">
                          <div className="stat-label">Humidity</div>
                          <div className="stat-value">{weather.humidity}%</div>
                          <div className="stat-range">
                            {weather.humidity > 70 ? 'High' : weather.humidity < 40 ? 'Low' : 'Moderate'} Humidity
                          </div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <FaCloudRain className="stat-icon" />
                        <div className="stat-content">
                          <div className="stat-label">Rainfall</div>
                          <div className="stat-value">
                            {weather.rainfall} mm
                          </div>
                          <div className="stat-range">
                            {weather.rainfall > 100 ? 'Heavy' : weather.rainfall > 50 ? 'Moderate' : 'Light'} Rain
                          </div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <FaWind className="stat-icon" />
                        <div className="stat-content">
                          <div className="stat-label">Wind Speed</div>
                          <div className="stat-value">{weather.windSpeed} m/s</div>
                          <div className="stat-range">
                            {weather.windSpeed > 5 ? 'Strong' : weather.windSpeed > 3 ? 'Moderate' : 'Light'} Wind
                          </div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <FaArrowUp className="stat-icon" />
                        <div className="stat-content">
                          <div className="stat-label">Pressure</div>
                          <div className="stat-value">{weather.pressure} hPa</div>
                          <div className="stat-range">
                            {weather.pressure > 1015 ? 'High' : weather.pressure < 1005 ? 'Low' : 'Normal'} Pressure
                          </div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <FaEye className="stat-icon" />
                        <div className="stat-content">
                          <div className="stat-label">Visibility</div>
                          <div className="stat-value">
                            {(weather.visibility / 1000).toFixed(1)} km
                          </div>
                          <div className="stat-range">
                            {weather.visibility > 10000 ? 'Clear' : weather.visibility > 5000 ? 'Moderate' : 'Poor'} Visibility
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Get Crop Recommendations CTA */}
                    <div className="crop-advice-cta">
                      <h3><FaSeedling /> Get Smart Crop Recommendations</h3>
                      <p>Based on current weather conditions and soil type analysis:</p>
                      <div className="weather-summary">
                        <div className="summary-item">
                          <span className="label">Location Type:</span>
                          <span className="value">{weather.region} Region</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">Temperature:</span>
                          <span className="value">{Math.round(weather.temperature)}°C</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">Humidity:</span>
                          <span className="value">{weather.humidity}%</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">Rainfall:</span>
                          <span className="value">{weather.rainfall} mm</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('crops')}
                        className="btn btn-crop-advice"
                      >
                        <FaArrowRight /> Get Crop Recommendations
                      </button>
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
                          <div className="crop-suggestion">
                            {day.temp.avg > 30 ? '🌵 Drought crops' : 
                             day.temp.avg < 15 ? '❄️ Cold crops' : 
                             day.humidity > 70 ? '🌊 Moisture crops' : '🌾 Normal crops'}
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
                    className="crop-recommendations-container"
                  >
                    <div className="crop-recommendations-header">
                      <h2><FaSeedling /> Smart Crop Recommendations</h2>
                      <p className="conditions-summary">
                        Based on {weather.location} • {Math.round(weather.temperature)}°C • {weather.humidity}% humidity • {weather.rainfall}mm rainfall
                      </p>
                      <div className="region-badge">
                        {weather.region === 'Coastal' && '🌊 Coastal Region'}
                        {weather.region === 'Dry/Arid' && '🌵 Dry/Arid Region'}
                        {weather.region === 'Plains' && '🌾 Plains Region'}
                        {weather.region === 'Hilly' && '⛰ Hilly Region'}
                        {weather.region === 'General' && '🌍 General Region'}
                      </div>
                    </div>

                    <div className="recommendation-type-selector">
                      <h3>Choose Recommendation Type:</h3>
                      <div className="type-buttons">
                        <button
                          className={`type-btn ${recommendationType === 'location' ? 'active' : ''}`}
                          onClick={() => setRecommendationType('location')}
                        >
                          <FaMapMarkerAlt /> Location-Based
                          <span className="type-desc">Based on regional climate patterns and current weather</span>
                        </button>
                        <button
                          className={`type-btn ${recommendationType === 'soil' ? 'active' : ''}`}
                          onClick={() => setRecommendationType('soil')}
                        >
                          <FaLeaf /> Soil-Based
                          <span className="type-desc">Based on soil type characteristics and weather conditions</span>
                        </button>
                      </div>
                    </div>

                    <div className="soil-selection">
                      <h3>Select Soil Type:</h3>
                      <div className="soil-buttons">
                        {soilTypes.map(type => (
                          <button
                            key={type}
                            className={`soil-btn ${soilType === type ? 'active' : ''}`}
                            onClick={() => setSoilType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <p className="current-selection">
                        Currently: <strong>{recommendationType === 'location' ? 'Location-Based' : 'Soil-Based'}</strong> recommendations with <strong>{soilType}</strong> soil
                      </p>
                    </div>

                    <div className="get-recommendations-btn">
                      <button 
                        onClick={getCropRecommendations}
                        disabled={cropLoading}
                        className="btn btn-get-recommendations"
                      >
                        {cropLoading ? (
                          <>
                            <FaSpinner className="spinner" /> Analyzing Conditions...
                          </>
                        ) : recommendationType === 'location' ? (
                          <>
                            <FaMapMarkerAlt /> Get Location-Based Recommendations
                          </>
                        ) : (
                          <>
                            <FaLeaf /> Get Soil-Based Recommendations
                          </>
                        )}
                      </button>
                    </div>

                    {/* Crop Recommendations Results */}
                    {cropRecommendations && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="crop-results"
                      >
                        <div className="results-header">
                          <h3>
                            <FaCheck /> {cropRecommendations.recommendationType === 'location' ? 'Location-Based' : 'Soil-Based'} Recommended Crops
                            <span className="results-count">({cropRecommendations.crops.length} crops)</span>
                          </h3>
                          <p className="results-summary">
                            Generated at {cropRecommendations.timestamp} • 
                            {cropRecommendations.recommendationType === 'location' 
                              ? ` Based on ${cropRecommendations.weatherConditions.location} analysis`
                              : ` Based on ${cropRecommendations.weatherConditions.soilType} soil analysis`
                            }
                          </p>
                        </div>

                        <div className="crops-grid">
                          {cropRecommendations.crops.map((crop, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="crop-card"
                            >
                              <div className="crop-header">
                                <div className="crop-icon">{crop.icon}</div>
                                <div className="crop-title">
                                  <h4 className="crop-name">{crop.name}</h4>
                                  <div className="crop-category">
                                    {cropRecommendations.recommendationType === 'location' 
                                      ? <span className="crop-region">{crop.region}</span>
                                      : <span className="crop-soil">{crop.soilType} Soil</span>
                                    }
                                  </div>
                                </div>
                                <div className="match-badge" style={{
                                  background: `linear-gradient(135deg, ${
                                    crop.matchPercentage >= 85 ? '#10B981' :
                                    crop.matchPercentage >= 75 ? '#3B82F6' :
                                    crop.matchPercentage >= 65 ? '#F59E0B' : '#EF4444'
                                  }, ${
                                    crop.matchPercentage >= 85 ? '#34D399' :
                                    crop.matchPercentage >= 75 ? '#60A5FA' :
                                    crop.matchPercentage >= 65 ? '#FBBF24' : '#F87171'
                                  })`
                                }}>
                                  {crop.matchPercentage}%
                                </div>
                              </div>
                              
                              <div className="crop-content">
                                <p className="crop-reason">
                                  <FaInfoCircle /> {crop.reason}
                                </p>
                                
                                <div className="crop-requirements">
                                  <h5>Ideal Conditions:</h5>
                                  <div className="requirements-grid">
                                    <div className="requirement">
                                      <div className="req-label">Temperature</div>
                                      <div className="req-value">{crop.idealTemp}</div>
                                    </div>
                                    <div className="requirement">
                                      <div className="req-label">{crop.idealHumidity ? 'Humidity' : 'Rainfall'}</div>
                                      <div className="req-value">{crop.idealHumidity || crop.idealRainfall}</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="crop-match">
                                  <div className="match-bar">
                                    <div 
                                      className="match-fill"
                                      style={{ 
                                        width: `${crop.matchPercentage}%`,
                                        background: `linear-gradient(90deg, ${
                                          crop.matchPercentage >= 85 ? '#10B981' :
                                          crop.matchPercentage >= 75 ? '#3B82F6' :
                                          crop.matchPercentage >= 65 ? '#F59E0B' : '#EF4444'
                                        }, ${
                                          crop.matchPercentage >= 85 ? '#34D399' :
                                          crop.matchPercentage >= 75 ? '#60A5FA' :
                                          crop.matchPercentage >= 65 ? '#FBBF24' : '#F87171'
                                        })`
                                      }}
                                    ></div>
                                  </div>
                                  <div className="match-text">
                                    {crop.matchPercentage >= 85 ? 'Excellent Match' :
                                     crop.matchPercentage >= 75 ? 'Very Good Match' :
                                     crop.matchPercentage >= 65 ? 'Good Match' : 'Fair Match'}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="recommendation-notes">
                          <h4><FaInfoCircle /> Important Farming Notes:</h4>
                          <ul>
                            {cropRecommendations.recommendationType === 'location' ? (
                              <>
                                <li><strong>Coastal regions:</strong> High humidity favors Rice, Coconut, Banana. Watch for fungal diseases.</li>
                                <li><strong>Dry/Arid regions:</strong> Drought-resistant crops like Millets, Pulses, Cotton. Water conservation is key.</li>
                                <li><strong>Plains regions:</strong> Ideal for Wheat, Sugarcane, Rice with irrigation. Manage water resources.</li>
                                <li><strong>Hilly regions:</strong> Cool climate crops like Apple, Potato, Tea. Terracing may be needed.</li>
                              </>
                            ) : (
                              <>
                                <li><strong>Alluvial soil:</strong> Fertile and productive. Suitable for Rice, Wheat, Sugarcane.</li>
                                <li><strong>Black soil:</strong> High moisture retention. Ideal for Cotton, Soybean, Groundnut.</li>
                                <li><strong>Red soil:</strong> Low fertility but good drainage. Best for Millets, Pulses, Groundnut.</li>
                                <li><strong>Laterite soil:</strong> Acidic and low fertility. Perfect for Tea, Coffee, Cashew.</li>
                                <li><strong>Sandy soil:</strong> Fast-draining. Suitable for Groundnut, Watermelon, Carrot.</li>
                                <li><strong>Clayey soil:</strong> Water-retaining. Good for Rice, Jute, Sugarcane.</li>
                                <li><strong>Loamy soil:</strong> Best overall soil. Suitable for most crops.</li>
                              </>
                            )}
                            <li>Always conduct soil testing before planting for accurate fertilizer recommendations.</li>
                            <li>Consider crop rotation to maintain soil health and prevent pest buildup.</li>
                            <li>Monitor weather forecasts regularly and adjust farming practices accordingly.</li>
                            <li>Consult local agricultural experts for region-specific advice.</li>
                            <li>Implement water conservation techniques like drip irrigation in dry regions.</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {/* No results yet state */}
                    {!cropRecommendations && !cropLoading && (
                      <div className="no-recommendations">
                        <div className="no-rec-icon">
                          <FaSeedling />
                        </div>
                        <h3>Get Crop Recommendations</h3>
                        <p>Click the button above to get personalized crop recommendations based on:</p>
                        <div className="factors-list">
                          <div className="factor">
                            <FaMapMarkerAlt /> Current location & region
                          </div>
                          <div className="factor">
                            <FaThermometerHalf /> Temperature conditions
                          </div>
                          <div className="factor">
                            <FaTint /> Humidity levels
                          </div>
                          <div className="factor">
                            <FaCloudRain /> Rainfall patterns
                          </div>
                          <div className="factor">
                            <FaLeaf /> Selected soil type
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* No weather data yet */}
            {!weather && !loading && (
              <div className="no-weather-data">
                <h3>Welcome to Smart Weather & Crop Advisor</h3>
                <p>Enter a city name or use your location to get weather data and crop recommendations.</p>
                <div className="demo-tips">
                  <h4>Try these cities for demo:</h4>
                  <div className="demo-cities">
                    <button onClick={() => { setCity('Mumbai'); getWeather(); }}>🌊 Mumbai (Coastal)</button>
                    <button onClick={() => { setCity('Rajasthan'); getWeather(); }}>🌵 Rajasthan (Dry)</button>
                    <button onClick={() => { setCity('Punjab'); getWeather(); }}>🌾 Punjab (Plains)</button>
                    <button onClick={() => { setCity('Himachal'); getWeather(); }}>⛰ Himachal (Hilly)</button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          onClick={() => navigate("/")}
          className="back-button"
        >
          ← Back to Home
        </button>
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
        }

        .page-title {
          text-align: center;
          color: white;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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
          display: grid;
          gap: 1rem;
        }

        .search-input-group {
          position: relative;
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
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e6ed;
        }

        .recent-searches h4 {
          margin-bottom: 1rem;
          color: #333;
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
          min-width: 140px;
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
          margin-bottom: 0.25rem;
        }

        .recent-region {
          font-size: 0.7rem;
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
          display: inline-block;
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 10px;
          margin: 1rem 0;
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

        .no-weather-data {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        .no-weather-data h3 {
          color: #333;
          margin-bottom: 1rem;
        }

        .demo-tips {
          margin-top: 2rem;
        }

        .demo-tips h4 {
          margin-bottom: 1rem;
        }

        .demo-cities {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .demo-cities button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e0e6ed;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .demo-cities button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        /* Current Weather Styles */
        .current-weather-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #e0e6ed;
        }

        @media (max-width: 768px) {
          .current-weather-header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
        }

        .location-info h2 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .weather-description {
          color: #666;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }

        .update-time {
          color: #888;
          font-size: 0.9rem;
        }

        .temperature-display {
          text-align: center;
        }

        .temp-main {
          font-size: 3rem;
          font-weight: 800;
          color: #f093fb;
          line-height: 1;
        }

        .temp-feels {
          color: #666;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .weather-icon-large {
          font-size: 4rem;
          color: #FFD700;
        }

        .weather-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 1.5rem;
          color: #667eea;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .stat-range {
          font-size: 0.7rem;
          color: #888;
          margin-top: 0.25rem;
        }

        .crop-advice-cta {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          border-radius: 15px;
          padding: 2rem;
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
          padding: 0.5rem 0;
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
        }

        .btn-crop-advice:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
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
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .forecast-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .forecast-card:hover {
          transform: translateY(-5px);
          background: white;
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

        .crop-suggestion {
          margin-top: 1rem;
          font-size: 0.8rem;
          color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
          padding: 0.5rem;
          border-radius: 10px;
        }

        /* Crop Recommendations Styles */
        .crop-recommendations-container {
          margin-top: 1rem;
        }

        .crop-recommendations-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .crop-recommendations-header h2 {
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .conditions-summary {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .region-badge {
          display: inline-block;
          background: rgba(76, 175, 80, 0.1);
          color: #2e7d32;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          border: 2px solid #4CAF50;
        }

        .recommendation-type-selector {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .recommendation-type-selector h3 {
          color: #333;
          margin-bottom: 1rem;
        }

        .type-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .type-btn {
          background: white;
          border: 2px solid #e0e6ed;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .type-btn:hover {
          border-color: #4CAF50;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .type-btn.active {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .type-btn svg {
          font-size: 2rem;
        }

        .type-desc {
          font-size: 0.8rem;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .soil-selection {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .soil-selection h3 {
          color: #333;
          margin-bottom: 1rem;
        }

        .soil-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .soil-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e0e6ed;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .soil-btn:hover {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.05);
        }

        .soil-btn.active {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .current-selection {
          color: #666;
          font-size: 0.9rem;
          background: white;
          padding: 0.75rem;
          border-radius: 8px;
          border-left: 4px solid #4CAF50;
        }

        .get-recommendations-btn {
          text-align: center;
          margin-bottom: 2rem;
        }

        .btn-get-recommendations {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .btn-get-recommendations:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        /* No recommendations state */
        .no-recommendations {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        .no-rec-icon {
          font-size: 4rem;
          color: #4CAF50;
          margin-bottom: 1rem;
        }

        .no-recommendations h3 {
          color: #333;
          margin-bottom: 1rem;
        }

        .factors-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 400px;
          margin: 1rem auto;
        }

        .factor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        /* Crop Results */
        .crop-results {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .results-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .results-header h3 {
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .results-count {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 1rem;
          margin-left: 0.5rem;
        }

        .results-summary {
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .crops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .crop-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .crop-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .crop-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .crop-icon {
          font-size: 2rem;
        }

        .crop-title {
          flex: 1;
        }

        .crop-name {
          color: #333;
          font-size: 1.2rem;
          margin: 0 0 0.25rem 0;
        }

        .crop-category span {
          font-size: 0.8rem;
          color: #666;
          background: rgba(45, 90, 95, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 10px;
          display: inline-block;
        }

        .match-badge {
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 15px;
          font-size: 1rem;
          font-weight: 700;
          min-width: 60px;
          text-align: center;
        }

        .crop-content {
          margin-top: 1rem;
        }

        .crop-reason {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .crop-requirements {
          margin-bottom: 1.5rem;
        }

        .crop-requirements h5 {
          color: #333;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .requirement {
          background: white;
          padding: 0.5rem;
          border-radius: 8px;
          text-align: center;
        }

        .req-label {
          font-size: 0.7rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .req-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
        }

        .crop-match {
          margin-top: 1rem;
        }

        .match-bar {
          height: 8px;
          background: #e0e6ed;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .match-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .match-text {
          text-align: center;
          font-size: 0.8rem;
          color: #666;
          font-weight: 500;
        }

        .recommendation-notes {
          background: #e8f5e9;
          border-radius: 15px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .recommendation-notes h4 {
          color: #2e7d32;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .recommendation-notes ul {
          list-style: none;
          padding: 0;
        }

        .recommendation-notes li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .recommendation-notes li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: #4CAF50;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .back-button {
          width: 100%;
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #10B981, #34D399);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
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
          
          .weather-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .forecast-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .crops-grid {
            grid-template-columns: 1fr;
          }
          
          .requirements-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          
          .soil-buttons {
            justify-content: center;
          }
          
          .weather-summary {
            grid-template-columns: 1fr;
          }
          
          .type-buttons {
            grid-template-columns: 1fr;
          }
          
          .demo-cities {
            flex-direction: column;
          }
          
          .recent-cards {
            flex-direction: column;
          }
          
          .recent-card {
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .weather-stats-grid {
            grid-template-columns: 1fr;
          }
          
          .forecast-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Weather;