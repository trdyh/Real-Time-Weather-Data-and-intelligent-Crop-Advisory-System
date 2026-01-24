import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaInfoCircle } from 'react-icons/fa';

const CropDatabase = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    let results = crops;
    
    // Apply search filter
    if (search) {
      results = results.filter(crop =>
        crop.name.toLowerCase().includes(search.toLowerCase()) ||
        crop.scientificName.toLowerCase().includes(search.toLowerCase()) ||
        crop.soilType.some(soil => soil.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    // Apply season filter
    if (filter !== 'all') {
      results = results.filter(crop =>
        crop.season.includes(filter)
      );
    }
    
    setFilteredCrops(results);
  }, [search, filter, crops]);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crops');
      setCrops(response.data);
      setFilteredCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const seasons = ['all', 'Winter', 'Summer', 'Kharif', 'Rabi', 'Year Round'];

  return (
    <div className="page">
      <h1 className="page-title">Crop Database</h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="database-container"
      >
        <div className="database-filters">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search crops by name, scientific name, or soil type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <FaFilter />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              {seasons.map(season => (
                <option key={season} value={season}>
                  {season === 'all' ? 'All Seasons' : season}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading crop database...</div>
        ) : (
          <div className="crops-grid">
            {filteredCrops.map((crop, index) => (
              <motion.div
                key={crop._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="crop-detail-card"
              >
                <div className="crop-detail-header">
                  <h3>{crop.name}</h3>
                  <span className="scientific-name">{crop.scientificName}</span>
                </div>
                
                <div className="crop-detail-body">
                  <div className="detail-section">
                    <h4><FaInfoCircle /> Climate Requirements</h4>
                    <div className="requirements-grid">
                      <div className="requirement">
                        <span className="label">Temperature:</span>
                        <span className="value">
                          {crop.suitableTemperature.min}°C - {crop.suitableTemperature.max}°C
                        </span>
                      </div>
                      <div className="requirement">
                        <span className="label">Humidity:</span>
                        <span className="value">
                          {crop.suitableHumidity.min}% - {crop.suitableHumidity.max}%
                        </span>
                      </div>
                      <div className="requirement">
                        <span className="label">Rainfall:</span>
                        <span className="value">
                          {crop.suitableRainfall.min}mm - {crop.suitableRainfall.max}mm
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Soil & Season</h4>
                    <div className="tags">
                      {crop.soilType.map(soil => (
                        <span key={soil} className="tag soil-tag">{soil}</span>
                      ))}
                      {crop.season.map(season => (
                        <span key={season} className="tag season-tag">{season}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Growth Information</h4>
                    <p><strong>Duration:</strong> {crop.growthDuration} days</p>
                    <p><strong>Water:</strong> {crop.waterRequirements}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Fertilizers</h4>
                    <div className="tags">
                      {crop.fertilizers.map(fert => (
                        <span key={fert} className="tag fertilizer-tag">{fert}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Common Pests & Diseases</h4>
                    <div className="issues">
                      <div className="pests">
                        <strong>Pests:</strong>
                        <ul>
                          {crop.pests.map(pest => (
                            <li key={pest}>{pest}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="diseases">
                        <strong>Diseases:</strong>
                        <ul>
                          {crop.diseases.map(disease => (
                            <li key={disease}>{disease}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Harvesting Tips</h4>
                    <ul className="tips">
                      {crop.harvestingTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && filteredCrops.length === 0 && (
          <div className="no-results">
            No crops found matching your search criteria.
          </div>
        )}
      </motion.div>

      <style jsx>{`
        .database-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .database-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .filter-select {
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
        }
        
        .crop-detail-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .crop-detail-header {
          border-bottom: 2px solid #e0e6ed;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .crop-detail-header h3 {
          color: #2d5a5f;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .scientific-name {
          color: #666;
          font-style: italic;
          font-size: 0.9rem;
        }
        
        .detail-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px dashed #e0e6ed;
        }
        
        .detail-section:last-child {
          border-bottom: none;
        }
        
        .detail-section h4 {
          color: #2d5a5f;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .requirement {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 10px;
        }
        
        .requirement .label {
          display: block;
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        
        .requirement .value {
          color: #2d5a5f;
          font-weight: 600;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tag {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .soil-tag {
          background: #e3f2fd;
          color: #1565c0;
        }
        
        .season-tag {
          background: #f3e5f5;
          color: #7b1fa2;
        }
        
        .fertilizer-tag {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .issues {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .issues ul {
          list-style: none;
          padding: 0;
          margin-top: 0.5rem;
        }
        
        .issues li {
          padding: 0.25rem 0;
          color: #666;
        }
        
        .tips {
          list-style: none;
          padding: 0;
        }
        
        .tips li {
          padding: 0.5rem 0;
          color: #666;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .tips li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #4CAF50;
          font-weight: bold;
        }
        
        .loading, .no-results {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default CropDatabase;