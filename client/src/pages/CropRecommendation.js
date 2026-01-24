import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, 
  FaThermometerHalf, 
  FaTint, 
  FaCloudRain, 
  FaSeedling,
  FaExclamationTriangle,
  FaSpinner,
  FaCheckCircle,
  FaArrowLeft
} from 'react-icons/fa';
import CropAnimation from '../components/CropAnimation';
import { useNavigate } from 'react-router-dom';

const CropRecommendation = () => {
  const [weather, setWeather] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [soilType, setSoilType] = useState('Loamy');
  const [city, setCity] = useState('');
  const [recommendationStatus, setRecommendationStatus] = useState('idle'); // idle, loading, success, error
  
  const navigate = useNavigate();
  
  const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Clay Loam', 'Sandy Loam', 'Black Soil'];

  // Load weather data from localStorage
  useEffect(() => {
    const loadWeatherData = () => {
      try {
        const savedWeather = localStorage.getItem('lastWeatherData');
        const savedFullWeather = localStorage.getItem('lastWeather');
        
        if (savedWeather) {
          const weatherData = JSON.parse(savedWeather);
          setWeather(weatherData);
          setCity(weatherData.location || 'Unknown Location');
          console.log('Loaded weather data:', weatherData);
        } else if (savedFullWeather) {
          const fullWeather = JSON.parse(savedFullWeather);
          const cropWeatherData = {
            temperature: fullWeather.temperature,
            humidity: fullWeather.humidity,
            rainfall: fullWeather.rainfall || 0,
            location: fullWeather.location,
            description: fullWeather.description
          };
          setWeather(cropWeatherData);
          setCity(cropWeatherData.location || 'Unknown Location');
          localStorage.setItem('lastWeatherData', JSON.stringify(cropWeatherData));
        } else {
          setError('No weather data found. Please check weather first.');
          setRecommendationStatus('error');
        }
      } catch (err) {
        console.error('Error loading weather data:', err);
        setError('Failed to load weather data');
        setRecommendationStatus('error');
      }
    };

    loadWeatherData();
  }, []);

  const getRecommendations = async () => {
    if (!weather) {
      setError('Please check weather data first from the Weather page');
      setRecommendationStatus('error');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendationStatus('loading');
    setCrops([]);

    try {
      console.log('Sending request with data:', {
        temperature: weather.temperature,
        humidity: weather.humidity,
        rainfall: weather.rainfall || 0,
        soilType: soilType,
        location: weather.location || city
      });

      const response = await axios.post('http://localhost:5000/api/crops/recommend', {
        temperature: weather.temperature,
        humidity: weather.humidity,
        rainfall: weather.rainfall || 0,
        soilType: soilType,
        location: weather.location || city
      }, {
        timeout: 10000 // 10 second timeout
      });

      console.log('Response received:', response.data);

      if (response.data && Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setCrops(response.data);
          setRecommendationStatus('success');
          
          // Save recommendations to history
          saveToHistory(response.data);
        } else {
          setError('No suitable crops found for current conditions');
          setRecommendationStatus('error');
        }
      } else {
        setError('Invalid response from server');
        setRecommendationStatus('error');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      
      let errorMessage = 'Failed to get crop recommendations';
      if (error.response) {
        errorMessage = error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'Server not responding. Please check if backend is running.';
      } else {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setRecommendationStatus('error');
      
      // For testing, show sample data
      // showSampleData();
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (recommendedCrops) => {
    const historyItem = {
      timestamp: new Date().toISOString(),
      weather: weather,
      soilType: soilType,
      crops: recommendedCrops.map(crop => ({
        name: crop.name,
        confidence: crop.confidence,
        reason: crop.reason
      }))
    };

    const existingHistory = JSON.parse(localStorage.getItem('cropHistory') || '[]');
    existingHistory.unshift(historyItem);
    localStorage.setItem('cropHistory', JSON.stringify(existingHistory.slice(0, 10))); // Keep last 10
  };

  const showSampleData = () => {
    const sampleCrops = [
      {
        _id: '1',
        name: 'Wheat',
        scientificName: 'Triticum aestivum',
        suitableTemperature: { min: 12, max: 25, optimal: 20 },
        suitableHumidity: { min: 40, max: 60 },
        suitableRainfall: { min: 500, max: 800 },
        soilType: ['Loamy', 'Clay Loam'],
        season: ['Winter', 'Rabi'],
        growthDuration: 120,
        waterRequirements: 'Moderate',
        fertilizers: ['Nitrogen', 'Phosphorus', 'Potassium'],
        pests: ['Aphids', 'Armyworm'],
        diseases: ['Rust', 'Smut'],
        harvestingTips: ['Harvest when grains are hard', 'Use combine harvester'],
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
        animation: 'wheat',
        score: 85,
        confidence: 85,
        reason: 'Optimal temperature range (12°C - 25°C). Humidity level suitable. Rainfall amount suitable. Suitable for Loamy soil.'
      },
      {
        _id: '2',
        name: 'Rice',
        scientificName: 'Oryza sativa',
        suitableTemperature: { min: 20, max: 35, optimal: 28 },
        suitableHumidity: { min: 70, max: 90 },
        suitableRainfall: { min: 1000, max: 2000 },
        soilType: ['Clay', 'Clay Loam'],
        season: ['Summer', 'Kharif'],
        growthDuration: 150,
        waterRequirements: 'High',
        fertilizers: ['Nitrogen', 'Silicon'],
        pests: ['Stem Borer', 'Leaf Folder'],
        diseases: ['Blast', 'Bacterial Blight'],
        harvestingTips: ['Harvest when 80% grains are ripe', 'Cut close to ground'],
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
        animation: 'rice',
        score: 75,
        confidence: 75,
        reason: 'Temperature range suitable. Humidity level suitable.'
      }
    ];
    
    setCrops(sampleCrops);
    setRecommendationStatus('success');
    saveToHistory(sampleCrops);
  };

  const handleBackToWeather = () => {
    navigate('/weather');
  };

  return (
    <div className="page">
      <div className="page-header">
        <button onClick={handleBackToWeather} className="btn-back">
          <FaArrowLeft /> Back to Weather
        </button>
        <h1 className="page-title">Crop Recommendation System</h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="recommendation-container"
      >
        {/* Weather Summary */}
        <div className="weather-summary-card">
          <h2>Current Weather Conditions</h2>
          {weather ? (
            <>
              <div className="conditions-display">
                <div className="condition-item">
                  <FaThermometerHalf />
                  <div>
                    <div className="condition-label">Temperature</div>
                    <div className="condition-value">{Math.round(weather.temperature)}°C</div>
                  </div>
                </div>
                <div className="condition-item">
                  <FaTint />
                  <div>
                    <div className="condition-label">Humidity</div>
                    <div className="condition-value">{weather.humidity}%</div>
                  </div>
                </div>
                <div className="condition-item">
                  <FaCloudRain />
                  <div>
                    <div className="condition-label">Rainfall</div>
                    <div className="condition-value">{weather.rainfall || 0} mm</div>
                  </div>
                </div>
                <div className="condition-item">
                  <FaLeaf />
                  <div>
                    <div className="condition-label">Location</div>
                    <div className="condition-value">{weather.location || city}</div>
                  </div>
                </div>
              </div>
              <div className="weather-description">
                Current conditions: {weather.description || 'Not specified'}
              </div>
            </>
          ) : (
            <div className="no-weather-alert">
              <FaExclamationTriangle />
              <p>No weather data available</p>
              <button onClick={handleBackToWeather} className="btn btn-primary">
                Check Weather First
              </button>
            </div>
          )}
        </div>

        {/* Recommendation Form */}
        <div className="recommendation-form-card">
          <h2>Get Crop Recommendations</h2>
          <div className="form-group">
            <label className="form-label">Select Soil Type</label>
            <div className="soil-type-grid">
              {soilTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  className={`soil-type-btn ${soilType === type ? 'active' : ''}`}
                  onClick={() => setSoilType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="recommendation-actions">
            <button
              onClick={getRecommendations}
              disabled={!weather || loading}
              className="btn btn-recommend"
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  Getting Recommendations...
                </>
              ) : (
                <>
                  <FaSeedling /> Get Crop Recommendations
                </>
              )}
            </button>
            
            <button
              onClick={showSampleData}
              className="btn btn-sample"
            >
              View Sample Recommendations
            </button>
          </div>
          
          {error && (
            <div className="error-alert">
              <FaExclamationTriangle /> {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {recommendationStatus === 'success' && crops.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="recommendations-results"
            >
              <div className="results-header">
                <h2>
                  <FaCheckCircle /> Recommended Crops
                  <span className="results-count">({crops.length} found)</span>
                </h2>
                <div className="results-summary">
                  Based on {Math.round(weather.temperature)}°C temperature, {weather.humidity}% humidity, 
                  and {soilType} soil in {weather.location || city}
                </div>
              </div>
              
              <div className="crops-grid">
                {crops.map((crop, index) => (
                  <motion.div
                    key={crop._id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="crop-card"
                  >
                    <div className="crop-header">
                      <div className="crop-title">
                        <h3 className="crop-name">{crop.name}</h3>
                        <span className="crop-scientific">{crop.scientificName}</span>
                      </div>
                      <div className="confidence-badge">
                        {Math.round(crop.confidence || crop.score)}% Match
                      </div>
                    </div>
                    
                    <CropAnimation type={crop.animation || 'wheat'} />
                    
                    <div className="crop-content">
                      <p className="crop-reason">
                        <strong>Why suitable:</strong> {crop.reason}
                      </p>
                      
                      <div className="crop-requirements">
                        <h4>Optimal Conditions:</h4>
                        <div className="requirements-grid">
                          <div className="requirement">
                            <div className="req-label">Temperature</div>
                            <div className="req-value">
                              {crop.suitableTemperature?.min}°C - {crop.suitableTemperature?.max}°C
                            </div>
                          </div>
                          <div className="requirement">
                            <div className="req-label">Humidity</div>
                            <div className="req-value">
                              {crop.suitableHumidity?.min}% - {crop.suitableHumidity?.max}%
                            </div>
                          </div>
                          <div className="requirement">
                            <div className="req-label">Rainfall</div>
                            <div className="req-value">
                              {crop.suitableRainfall?.min}mm - {crop.suitableRainfall?.max}mm
                            </div>
                          </div>
                          <div className="requirement">
                            <div className="req-label">Season</div>
                            <div className="req-value">
                              {crop.season?.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="crop-details">
                        <h4>Cultivation Details:</h4>
                        <div className="details-grid">
                          <div className="detail">
                            <span className="detail-label">Growth Duration:</span>
                            <span className="detail-value">{crop.growthDuration} days</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">Water Needs:</span>
                            <span className="detail-value">{crop.waterRequirements}</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">Soil Types:</span>
                            <span className="detail-value">{crop.soilType?.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="fertilizers-section">
                          <h5>Recommended Fertilizers:</h5>
                          <div className="fertilizer-tags">
                            {crop.fertilizers?.map((fert, idx) => (
                              <span key={idx} className="fertilizer-tag">{fert}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pests-section">
                          <h5>Common Pests & Diseases:</h5>
                          <div className="pests-list">
                            <div className="pests">
                              <strong>Pests:</strong> {crop.pests?.join(', ')}
                            </div>
                            <div className="diseases">
                              <strong>Diseases:</strong> {crop.diseases?.join(', ')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="harvesting-tips">
                          <h5>Harvesting Tips:</h5>
                          <ul>
                            {crop.harvestingTips?.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="results-footer">
                <p>
                  <strong>Note:</strong> These recommendations are based on current weather conditions. 
                  Always consult local agricultural experts for specific advice.
                </p>
                <button onClick={getRecommendations} className="btn btn-refresh">
                  Refresh Recommendations
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .page-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .btn-back {
          position: absolute;
          left: 0;
          top: 0;
          background: none;
          border: 2px solid #2d5a5f;
          color: #2d5a5f;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-back:hover {
          background: #2d5a5f;
          color: white;
        }
        
        .recommendation-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .weather-summary-card, .recommendation-form-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .conditions-display {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        
        .condition-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 15px;
          transition: transform 0.3s ease;
        }
        
        .condition-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .condition-item svg {
          font-size: 2rem;
          color: #2d5a5f;
        }
        
        .condition-label {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.25rem;
        }
        
        .condition-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d5a5f;
        }
        
        .weather-description {
          text-align: center;
          padding: 1rem;
          background: #e8f5e9;
          border-radius: 10px;
          color: #2e7d32;
          font-weight: 500;
          margin-top: 1rem;
        }
        
        .no-weather-alert {
          text-align: center;
          padding: 3rem;
          color: #ff6b6b;
        }
        
        .no-weather-alert svg {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .soil-type-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .soil-type-btn {
          padding: 1rem;
          border: 2px solid #e0e6ed;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .soil-type-btn:hover {
          border-color: #2d5a5f;
          background: rgba(45, 90, 95, 0.05);
        }
        
        .soil-type-btn.active {
          background: #2d5a5f;
          color: white;
          border-color: #2d5a5f;
        }
        
        .recommendation-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        
        .btn-recommend {
          background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
          color: white;
          flex: 1;
          padding: 1rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .btn-sample {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: white;
          flex: 1;
          padding: 1rem;
          font-size: 1.1rem;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .error-alert {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 10px;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-left: 4px solid #c62828;
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .results-header h2 {
          color: #2d5a5f;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
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
          line-height: 1.6;
        }
        
        .crops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .crop-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .crop-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .crop-header {
          padding: 1.5rem;
          background: linear-gradient(90deg, #2d5a5f 0%, #3a7a80 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .crop-title {
          flex: 1;
        }
        
        .crop-name {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }
        
        .crop-scientific {
          font-size: 0.9rem;
          opacity: 0.8;
          font-style: italic;
        }
        
        .confidence-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 1.1rem;
          backdrop-filter: blur(10px);
        }
        
        .crop-content {
          padding: 1.5rem;
        }
        
        .crop-reason {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          color: #666;
          line-height: 1.6;
          border-left: 4px solid #4CAF50;
        }
        
        .crop-requirements {
          margin-bottom: 1.5rem;
        }
        
        .crop-requirements h4 {
          color: #2d5a5f;
          margin-bottom: 1rem;
        }
        
        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .requirement {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 10px;
        }
        
        .req-label {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.25rem;
        }
        
        .req-value {
          font-weight: 600;
          color: #2d5a5f;
        }
        
        .crop-details h4 {
          color: #2d5a5f;
          margin: 1.5rem 0 1rem;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .detail {
          background: #f8f9fa;
          padding: 0.75rem;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
        }
        
        .detail-label {
          color: #666;
        }
        
        .detail-value {
          font-weight: 600;
          color: #2d5a5f;
        }
        
        .fertilizers-section, .pests-section, .harvesting-tips {
          margin-bottom: 1.5rem;
        }
        
        .fertilizers-section h5, .pests-section h5, .harvesting-tips h5 {
          color: #2d5a5f;
          margin-bottom: 0.5rem;
        }
        
        .fertilizer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .fertilizer-tag {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .pests-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }
        
        .pests, .diseases {
          background: #f8f9fa;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
        }
        
        .harvesting-tips ul {
          list-style: none;
          padding: 0;
        }
        
        .harvesting-tips li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: #666;
        }
        
        .harvesting-tips li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #4CAF50;
          font-weight: bold;
        }
        
        .results-footer {
          text-align: center;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 15px;
          margin-top: 2rem;
        }
        
        .results-footer p {
          color: #666;
          margin-bottom: 1.5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .btn-refresh {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 2rem;
        }
        
        .btn-primary {
          background: #2d5a5f;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
          .page-header {
            text-align: center;
          }
          
          .btn-back {
            position: relative;
            margin-bottom: 1rem;
            align-self: center;
          }
          
          .conditions-display {
            grid-template-columns: 1fr;
          }
          
          .crops-grid {
            grid-template-columns: 1fr;
          }
          
          .requirements-grid {
            grid-template-columns: 1fr;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .recommendation-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default CropRecommendation;