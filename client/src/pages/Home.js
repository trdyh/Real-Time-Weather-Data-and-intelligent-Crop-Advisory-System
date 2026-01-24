import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserFromToken } from "../utils/auth";
import farm1 from "../assets/farm1.jpg";
import farm2 from "../assets/farm2.jpeg";

import {
  FaCloudSun,
  FaSeedling,
  FaChartLine,
  FaLeaf,
  FaTint,
  FaThermometerHalf,
  FaWind,
  FaSun,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaChevronRight,
  FaCheckCircle,
  FaCalendarAlt,
  FaHome,       
  FaTimes,       
  FaWater,       
  FaBug,         
  FaClock,
  FaYoutube
} from "react-icons/fa";

const heroBackgrounds = [farm1, farm2];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Home = () => {
  const [currentCropIndex, setCurrentCropIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFarmingTips, setShowFarmingTips] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

   /* 🔹 HERO BACKGROUND SLIDER STATE */
  const [bgIndex, setBgIndex] = useState(0);

  /* 🔹 BACKGROUND AUTO SLIDE */
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);

    return () => clearInterval(bgInterval);
  }, []);

  const farmingTips = [
    {
      id: 1,
      title: "Water Conservation",
      icon: <FaWater />,
      color: "#3B82F6",
      tips: [
        "Water plants early morning or late evening to reduce evaporation",
        "Use drip irrigation systems for efficient water usage",
        "Collect rainwater in barrels for irrigation",
        "Mulch around plants to retain soil moisture",
        "Check soil moisture before watering"
      ]
    },
    {
      id: 2,
      title: "Pest Control",
      icon: <FaBug />,
      color: "#EF4444",
      tips: [
        "Plant marigolds to naturally repel pests",
        "Use neem oil as organic pesticide",
        "Introduce beneficial insects like ladybugs",
        "Practice crop rotation to break pest cycles",
        "Remove infected plants immediately"
      ]
    },
    {
      id: 3,
      title: "Soil Health",
      icon: <FaSeedling />,
      color: "#10B981",
      tips: [
        "Test soil pH every 2-3 months",
        "Add compost regularly to improve soil structure",
        "Practice no-till farming to preserve soil microbes",
        "Use cover crops during off-season",
        "Rotate nitrogen-fixing crops"
      ]
    },
    {
      id: 4,
      title: "Seasonal Planning",
      icon: <FaCalendarAlt />,
      color: "#F59E0B",
      tips: [
        "Plan crop rotation based on seasons",
        "Start seeds indoors 4-6 weeks before last frost",
        "Use succession planting for continuous harvest",
        "Keep a farming journal for better planning",
        "Monitor weather patterns for planting decisions"
      ]
    },
    {
      id: 5,
      title: "Crop Management",
      icon: <FaLeaf />,
      color: "#8B5CF6",
      tips: [
        "Space plants properly for optimal growth",
        "Prune regularly for better yield",
        "Stake tall plants for support",
        "Monitor plant health weekly",
        "Harvest at right maturity for best quality"
      ]
    },
    {
      id: 6,
      title: "Time Management",
      icon: <FaClock />,
      color: "#EC4899",
      tips: [
        "Create daily farming schedule",
        "Prioritize time-sensitive tasks",
        "Batch similar tasks together",
        "Use technology for reminders",
        "Allocate time for learning new techniques"
      ]
    }
  ];

  const crops = [
    {
      emoji: "🌾",
      name: "Wheat",
      description: "Best grown in cool, temperate climates with well-drained soil",
      season: "Rabi Season",
      temp: "15-25°C",
      color: "#FBBF24",
      gradient: "linear-gradient(135deg, #FBBF24, #F59E0B)"
    },
    {
      emoji: "🌽",
      name: "Corn",
      description: "Thrives in warm weather with plenty of sunlight",
      season: "Kharif Season",
      temp: "21-30°C",
      color: "#84CC16",
      gradient: "linear-gradient(135deg, #84CC16, #65A30D)"
    },
    {
      emoji: "🍚",
      name: "Rice",
      description: "Requires flooded fields and high temperatures",
      season: "Kharif Season",
      temp: "20-35°C",
      color: "#22D3EE",
      gradient: "linear-gradient(135deg, #22D3EE, #06B6D4)"
    },
    {
      emoji: "🥔",
      name: "Potato",
      description: "Cool season crop, sensitive to high temperatures",
      season: "Rabi Season",
      temp: "15-20°C",
      color: "#A78BFA",
      gradient: "linear-gradient(135deg, #A78BFA, #8B5CF6)"
    },
    {
      emoji: "🌻",
      name: "Sunflower",
      description: "Needs full sun and well-drained, nutrient-rich soil",
      season: "Zaid Season",
      temp: "20-30°C",
      color: "#F97316",
      gradient: "linear-gradient(135deg, #F97316, #EA580C)"
    }
  ];

  const features = [
    {
      icon: <FaCloudSun />,
      title: "Live Weather Intelligence",
      desc: "Real-time hyperlocal weather forecasts with AI-powered insights",
      color: "#4F46E5",
      gradient: "linear-gradient(135deg, #4F46E5, #7C3AED)",
      stats: "99% Accuracy",
      link: "/weatherOnly"
    },
    {
      icon: <FaSeedling />,
      title: "Smart Crop Advisor",
      desc: "AI recommends perfect crops based on soil, weather, and market trends",
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #34D399)",
      stats: "50+ Crops",
      link: "/WeatherWithCrops"
    }
  ];

  // Weather stats removed from here

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farm Owner, Punjab",
      text: "Increased my wheat yield by 40% using AgroSmart's weather predictions!",
      rating: 5,
      image: "👨‍🌾"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Agricultural Scientist",
      text: "The most accurate weather-based crop recommendation system I've seen.",
      rating: 5,
      image: "👩‍🔬"
    },
    {
      name: "Amit Patel",
      role: "Organic Farmer",
      text: "Saved 30% on water usage with smart irrigation suggestions. Game changer!",
      rating: 4,
      image: "👨‍🌾"
    }
  ];

  const Actions = [
    { icon: "🌦️", label: "Check Today's Weather", action: "View Forecast", link: "/weather" },
    { icon: "🌱", label: "Get Crop Advice", action: "Get Recommendations", link: "/crop-recommendation" },
    { icon: "💡", label: "Farming Tips", action: "Learn More", onClick: () => setShowFarmingTips(true) },
  ];
  const quickActions = [
  { icon: "🌦️", label: "Check Today's Weather", action: "View Forecast", link: "/weather-only" },
  { icon: "🌱", label: "Get Crop Advice", action: "Get Recommendations", link: "/weather-with-crops" },
  { icon: "💡", label: "Farming Tips", action: "Learn More", onClick: () => setShowFarmingTips(true) },
];

  // Cycle through crops every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCropIndex((prev) => (prev + 1) % crops.length);
        setIsAnimating(false);
      }, 500);
    }, 30000);

    return () => clearInterval(interval);
  }, [crops.length]);

  return (
    <div className="home-container">
      <Navbar/>
      {/* Animated Background Elements */}
      <div className="bg-gradient"></div>
      <div className="floating-leaf floating-leaf-1">🍃</div>
      <div className="floating-leaf floating-leaf-2">🌾</div>
      <div className="floating-leaf floating-leaf-3">🌻</div>
      
      {/* Hero Section */}
      <section className="hero-section">
        {/* 🔹 SLIDING BACKGROUND */}
        <div className="hero-bg">
          <AnimatePresence>
            <motion.div
              key={bgIndex}
              className="hero-bg-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                backgroundImage: `url(${heroBackgrounds[bgIndex]})`
              }}
            />
          </AnimatePresence>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-badge"
            >
              { <FaStar className="star-icon" />
              <span>AI-Powered Precision Farming</span> }
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-title"
            >
              <span className="title-line">Grow Smarter,</span>
              <span className="title-line highlight">Harvest Bountiful</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hero-description"
            >
              Transform your farming with real-time weather intelligence and AI-powered 
              crop recommendations. Experience <span className="highlight-text">40% higher yields</span> 
              and <span className="highlight-text">30% lower costs</span> with our smart farming platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-actions"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="cta-primary"
              >
                <Link to="/weather" className="cta-link">
                  <FaPlay className="play-icon" />
                  <span>Start Free Trial</span>
                  <div className="cta-glow"></div>
                </Link>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-secondary"
              >
                <Link to="/crop-recommendation" className="cta-link">
                  <FaSeedling />
                  <span>View Live Demo</span>
                  <FaChevronRight />
                </Link>
              </motion.button>

              {/* Video Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="cta-video"
                onClick={() => setShowVideoModal(true)}
              >
                <FaYoutube className="youtube-icon" />
                <span>Watch Farm Tech</span>
              </motion.button>
            </motion.div>

            {/* Stats Grid REMOVED */}
          </motion.div>

          {/* Animated Crop Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-visual"
          >
            <div className="animated-crop-widget">
              <div className="crop-widget-header">
                <FaSeedling className="crop-icon" />
                <span>Smart Crop Cycle</span>
                <div className="crop-timer">
                  <div className="timer-bar">
                    <motion.div
                      className="timer-progress"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      onAnimationComplete={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentCropIndex((prev) => (prev + 1) % crops.length);
                          setIsAnimating(false);
                        }, 500);
                      }}
                      key={currentCropIndex}
                    />
                  </div>
                  <span className="timer-text">Next crop in 5s</span>
                </div>
              </div>
              
              <div className="crop-widget-content">
                <motion.div
                  key={currentCropIndex}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ 
                    opacity: isAnimating ? 0 : 1, 
                    scale: isAnimating ? 0.8 : 1,
                    rotate: isAnimating ? -10 : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="crop-display"
                >
                  <div 
                    className="crop-emoji"
                    style={{ background: crops[currentCropIndex].gradient }}
                  >
                    {crops[currentCropIndex].emoji}
                  </div>
                  
                  <div className="crop-info">
                    <h3 className="crop-name">{crops[currentCropIndex].name}</h3>
                    <p className="crop-description">{crops[currentCropIndex].description}</p>
                    
                    <div className="crop-details">
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <span>{crops[currentCropIndex].season}</span>
                      </div>
                      <div className="detail-item">
                        <FaThermometerHalf />
                        <span>{crops[currentCropIndex].temp}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Crop Dots Indicator */}
                <div className="crop-dots">
                  {crops.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`crop-dot ${index === currentCropIndex ? 'active' : ''}`}
                      onClick={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentCropIndex(index);
                          setIsAnimating(false);
                        }, 300);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ background: crops[index].gradient }}
                    />
                  ))}
                </div>
              </div>
              
              {/* <div className="crop-widget-footer">
                <span>Crops</span>
                <FaCheckCircle style={{ color: '#10B981' }} />
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Everything You Need for
            <span className="section-highlight"> Smart Farming</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Powered by AI and real-time data for maximum agricultural efficiency
          </motion.p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="feature-card"
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              style={{ background: feature.gradient }}
            >
              <Link to={feature.link} className="feature-link">
                <motion.div
                  className="feature-icon"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <div className="feature-footer">
                  <span className="feature-stats">{feature.stats}</span>
                  <FaArrowRight className="feature-arrow" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Quick Actions</h2>
          <p className="section-subtitle">Get started in seconds</p>
        </motion.div>

        <div className="actions-grid">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              className="action-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={action.onClick || undefined}
              style={{ cursor: action.onClick ? 'pointer' : 'default' }}
            >
              <div className="action-icon">{action.icon}</div>
              <h3 className="action-title">{action.label}</h3>
              {action.link ? (
                <Link to={action.link} className="action-button">
                  {action.action}
                  <FaChevronRight />
                </Link>
              ) : (
                <div className="action-button" onClick={action.onClick}>
                  {action.action}
                  <FaChevronRight />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Trusted by
            <span className="section-highlight"> Farmers Worldwide</span>
          </motion.h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, j) => (
                  <FaStar
                    key={j}
                    className={j < testimonial.rating ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cta-container"
        >
          <h2 className="cta-title">Ready to Transform Your Farming?</h2>
          <p className="cta-subtitle">Join thousands of farmers using AgroSmart today</p>
          <div className="cta-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-primary-lg"
            >
              <Link to="/weather" className="cta-link">
                Start Free Trial
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-secondary-lg"
            >
              <Link to="/crop-recommendation" className="cta-link">
                Schedule Demo
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <FaSeedling className="footer-logo-icon" />
            <div>
              <h3 className="footer-logo-title">AgroSmart</h3>
              <p className="footer-logo-subtitle">AI Farming Assistant</p>
            </div>
          </div>
          
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/weather" className="footer-link">Weather</Link>
            <Link to="/crop-recommendation" className="footer-link">Crop Advice</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
          
          <div className="footer-social">
            <span className="footer-copyright">© 2024 AgroSmart. All rights reserved.</span>
            <div className="social-icons">
              <span>🌐</span>
              <span>📱</span>
              <span>📧</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-modal-overlay"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="video-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-section">
                  <FaPlay className="modal-title-icon" />
                  <h2 className="modal-title">Precision Agriculture: Farming For Our Future</h2>
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowVideoModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="video-container">
                <iframe
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXGR0bGBgYFxcaHRodGxcYGh0aHR0dHSggHRolHRcZIjEiJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUwMC03LTcvLy8vLi81Ly8vLS01LTItLy8wLS01LS0tLS0vLS0tLS8tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAEAQAAIBAwMCBAQDBgUCBQUAAAECEQADIQQSMQVBEyJRYTJxgZEGQqEUUrHB0fAjM2Jy4YLxFVOSotIHJEOywv/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAQQFAAb/xAAxEQACAgEDAgQEBgIDAQAAAAABAgARAxIhMQRBEyJRYXGBkfAUMrHB0eEFoVJi8UL/2gAMAwEAAhEDEQA/ADrmrtPcMkLPNeWr/hElfhbvULvT7QZjEsDz6UUNShUWwokZJrx+PKmRNJG3rH6SN400PUQ2IwKtuXAGXykicgenekukcqf9xp5Y1JVgIkRn2rOy9OuHqFrYRyNqXeV9V6ypuBbMAd8fyrNdZ/EV7x0RbavHsaM1ehL35GFOT7GjF0K4Nsjce9awcJlBq7gm4T061uXfdVUnt3rrlvTyWVVn1gUBf6a4Ym4zn+FHWvw6z29yFmP7oOapZunZs533Pbf7MkNtJeHuEoRNNBqLTpsvpGMHsfkexrM6bcrFUkHvuFO+nzdQq3xCuTx+jBJFqZOoN5TzMzrOjEOTZBYHgURp+gNa2s6EE8zTrpt42rhU59KJ6trrlwhdsCm3iyKfPR5iwKPE9tKIqPij4a9tdOdRLNzU9Jo0Vt2WNZbZMSqQhNy3diR0gIkHvxSK7+H2a6zs0iZArT6i5GYqh76tGYNT0OdseQkitW3zkiom8C4phajd8WcimOr0+oswzJKngj+8VDT9XEwVzXoFV12YRimxtBDrLicgxVa9YM04vEXFIApYnRCOahdDRgocy231U1C9dJyaptaFg0RUNcHUwRg8VJobRyab2hHjdqsRqX2mPFHW7RBE0BljYQm1qYoqzqxNCXLQFVqsGaUy3BKK28dtd96C1VwnjNEaZ1YUNdYKYpFUalfGKbiW2mxFUXbZGYqzf6UxbWA2tpUzFVsWBBqJNfvIZih2ET3nxmqkZl7yKlrifSq1uxihKMB5YR4l/wC1FvLXl2xtAZuBk/0qOiteae9LfxDr58oOB+tWOg6csdx5Rz7+0TptqEU9X1+9iTx6e3pWa1SbSR/ZphqWmgb7SvuMfTt/ftXoMR3qFkFCLrwoZhRFw0K5q0BKrGbjVIxIRSY7t6nvRdjpdxTnyrGT3ph1i4RsCgADPvFQ0nUQX80kEcV5hHYYQ+i+e8pig1Sy101VA2sWbsKb6TSJZUvdYsx4QVZotXauMQPLtET/ACFB9Q1SksiyWiAarrlcvRAax3HHx+EsVtYlGq1G6VUADvSfSs3jAHENRLJsUBzDTwP50103TtwFxn2L6mJPyHYVqYszLquiOB2HyihsYB13VXThVYj1zVGg6tqtPHhhmkZETijeq/iSza8ttGcjknE0s0P4tIPmt+X25FQPxIxjTi49/wBO8na4202vW8ZdCtz3EZqWl8a3dBZSFJgY5FEftNu8ge3M8mBkCibmpuEAnO3getVQxKnWG83Ym6kmr2nnVtGdwde9FMCbSkiCKt0t/wAW3kbWXsa81d07INUs3hJj/wCw2kgG4MmrZgRAiatQxwKD0m5YEZJpm+njzEkewFNGzA3W3AHaNXyjeDazUIB5sVQmmW4mKPbpNu+ssSIPBwat/YLVgeUsf1in5umL4hlXtv2qCXXVFWg62wBsXPPGBPP/ADVyaRW8wWvb2ht7t4qdooJKNn0mnHqPHUMrcfdRoAG4gwvQY296PNzFCnUpBLDaahp+ooAx5Aj07yKauMtxDJ2gnUtX4ZBihNV1IXIMcUw1vh3UJxj+o+3f70i1Kjb5QPi24+8zzwCI4zNNRCF80ahBhIuqc0Tad24jFANa221MCZ/+Xf7fb3q8asqqR+af0wfnJzniuZdo6/SdqNQZg4NRtuasusrZPNStIIxSwtxwcASy1qyvFVu5uHFRe2fb70b00LE8n+dQ+MjgQTkCjUJK1c2YNXnUwKtu6RWkEjygSR6mlhtwSpNLydMFPmlcMr7y2/qzIESKPW2hWaSi5LRzFN9M+1d7f9I/n/Slp02tqXb3gZNhtB+o31tIQPjbn2HpWK6jqZpt13qYJPaspfvya1dIRQqwsa0LM649AXbsH2ODVty5QWoM0a7G5L7iV38VQTVrNI9xQrGry7ixKLbGfW7/AE8XwHUkMB/YoToNoftI34yQfsSKY2+uLdtW7kBbqyrAfm4g1I3E3K7rEkA/WvJnxMDjFdqeP4iVAO8CfR3DcLIcFjA+vJ9qbHSrZQsT5jyf5CltrqFlbtxVkD1/pQpa7eVyCXIOKWUZsmnIdK2L9/SSKEgw3HceJmjbnUt4z8gKiypbtqHMEwW9vYVSh07EbCxJ7RNbS5sDFaUnTxtsIJHpAOpWkjdFC6DTeJgLgcwK3FrpCvb27do/1VDTac2AUVVifiH9Kg/5JXUmiKkaSso6HpXt3EKg5wQeI961PUNEpIa0VW4M7ScN/Q1hur9S1C4Q98mMj6UJ0/qTpc8R2Ldj8qnUPBJUau4v1/acEveNr/UrqX/MsE4inrWyw8xj1Nd1A23t27sAwQQfSld/UveY7J2jGK8x1A8TJfHeGPLsd4zuyYCx/feiNsAbmMngdz8qF02lYEEntgU0GjDBCxg7WAM8E969F/i+lTGh8U8/pdRWZmNVPbem45z60J1ayyKTtJXvHaaOtaQIhHrEfTvRSEeVefLV1cWLVXtwfp6TrImWDt4cjkfrXdG01i4Cd/h3Scg8T/fvTfX6Y223KBEEH5UptaASX/N2/pWXh6MdNkahf8S0vmXmR13TGFwC5DW4ZpWRO1GYA+kx2qem02n2lVVYIyIuD3/8zsaadKfcYYeoOD3Vvb2pZe06rETE5jJic/pVzpM5ZKK6TZFc+nf5zjZNE8QLU6ZkSRZTYxjm729t/HP2q7plhDg2rYzMTc5jn46eJp5QIzDYDO4RJHYR6yT9h61RY6fFXOpBSh7e3znYsgYGz+sXai3bmGtIROM3P/lV2n0liP8ALWBx8ZieeXq3V2FUkMINK9ReM+Wq4Pw+glirGxP1nut0FsODwpAMTxIn7UZpbNoLjv70q6xfYFQZ+BO3+kd6G0mvxsgj3jvUlAHMLzMg3mqu9IXwwxIk/wA+M96H0ulC5GcyfmDSy5q32wX/ALPtVnTrWqJO22xB4JEQPrTGAYjQIrzBTqMJa7IaSAJnH2pVbDFvWT2rQ2+hOJ8S6BxAGZ9eamdLZ0/mAz6sZ+1DlwZGNtITMoFLFmn6aEO65Hsv9fQUm631SSQG+cVL8QdUVidixPJnJrJazUVAAQUI9FLbtBdfqNxoRnrrrSaJ0vSb1yNqGD+Y4H3PP0obHeOJqAO1T0mhuXm2os+/YfOtTpvwzbSDdYu37owPr3/hTYanw9qpbVQOwHFIydQ24xrfv2ldsg4Eyr9E2BrZBLEfFBwfb2rLX7ZDEEQRzX2Z7odAxAkHPtSzqv4V099xcbkqBKtExOT79voKHp/8ocYrMp+W+/wld94vWzbgNbIVeaP279yyGHsfSvNR4F0m2pFq4uAGxP8AKguhaG4t1xckN+U9j8jVUg+Hrbt68xABDVKh05nczhe57AU5bVhbTLZhQqkg9yfWg9ZrBPhnjPH5iKDuaZlXBmfQ8VL4j1GVQ+w7DsR6zid5b1jp1y6LQQ42y7H++aI6RqrdhSEHm7ueTUrF5xaCueRAHt6mgWCx71ZwYWdPDvyg/Xed7z3qXV7mclvrxVNrrN0Qq9+08e9V6sqi+9Lhq4PlGatjpsYFBZB2M+i9I6rZJAvqAwHxAYPzoXq3TrLvNuVBzxg/KsroblwgkqQa1Og1zW9PscAz8LHlfb5Up7UUKEZoPIgms6r4VtrIyOx9Ku/D5fbuHeqfxLat+EWxvEYHvRf4eJAUngDisfw0yWR3MXu2SOdLqwW2iSR3NGW33HMmKo1esDDfAUDAqVu8CoKjB4q/gzY1bQPNXf1hZOY1t3FP5TQ2q1IT2NV6e2wGTXajTK480496unqVrg/SQonv7St9CswSMxWa1C3NMcyVnDdvr7056doUsztzuYkkwTn9aIvai2ZtPBVsQapp1K5HNmx29R7H4Rqal4ibS9bm6CqwArmOeLbnmr9RrIKOhzzXafogsPuBlfy+2OPeibqBlJUIIiP8O365/LVi8etdyCCf0v8AaSQbsccRhZ14I3DZuj0z/H+4qSXvfNZy31KGcSnl2/8A47fc/wC2jm1h2bl2lpj4E9J9KfmbXye18f3IXHUM1ViZJye9INZbceZVJExgd8f1q5uvuFBIWZIIKL/Shep9SPhoyqhLbpm3bPBj92gx6b3v1jvOBUT/AIp1Ja8Ft+YBEgkR+Xv6UJ0vp10tuYAAcxP2/v3qy7q2Ylolj3gDgQAAMAACIrzTaq4reZsGibzOSOI1CVQCPv2QyXgeT2iDIHPeJ7UbZ62bLKhaYyZyc9vp/OhNRrxbt+aN7ZyZ2xx9e9Ze7qA7MzccAHv/AH/OrNhSNMQqlwdfE2XW/wARbyvhO4ABlvMvMR9v50jbWXb7BQ7HdgSTkev8aSXLa7ZxyQCB6Tx6/wDb1q3pWt2EG4BuX4QGiDOCTiYzj5UTMXfz7SFUJj8m9SPWbDozBiZGSPmJ/nSnTWDdaJgDk/33pl1/qaOSwHmYQ3mmTnPJjywIqGh3Iirty3m+/H6RSMygMdMdidtA1cw79hs21BVZPqcn+n2rSWlYW14JNLtJomfbPftRtzUg3SnG3H2rPyGzo+cgkkyrV3JxwxNVXbIDKd3zFDdQvefnIMigtfo3kOJO7MVyLRomhOrvGty6VaFyDUNLorrLM8kx8qL0OhcKrECQMyasTWCAIiBFUOpKsaWKdRczn42tL5XGCw+9Bfh7qbHbZuElexnKmOR/SmnVtG93S4GVPl9Y9/4fSs7otE6E7pkCM+tafSBW6fw2NkbfxEsbNiPuqdMOxHySpkR3HqKM6d1ePIYuHtuE4jief1q/p/UZ06WGgsvwN8/y0tvaDw2LjBAyI4NLfExx6D2O38SGUgXGg6xaLebTJ85H/wAaLF7QOJ2hfluBH2xWWXUA80Dr9SS0WwYHNPb/ABoNaGZfgx/e5GsTV6rounvCLN8buwY/8A/oay1/pt/S3Ju2zBwHGVPtI4PsYNUSTGczxWy6T1FyRaC+IpHmRswO+T/DihyHP0w/NrX0NA/UbfUfOSi6t5Vp9TuQAL5jXmo0O6Fa7Ht2qfVGez/jaaDbEhwclD6HvHvQ3RurWbjMt0Lufg9vl7VWtsmPxcZI9u4+UPUx2MK6xoWFs7ufKQR34n9Z+9M+k8kx5cCfp2ry7pGbTtaUksmV9xM7ft/Kqul9QTG8wqjgdzVKnzbKbN18vWLsISYX1RS6FRM7vsKI0l9BaCOQp+HOBP8AL/mpuQxLWg5TlmI/QUh1RN1hJ2qDyf8AjJPfH6U8dKybMO/P393COVQvl3JmqXR3NsgBVAmSREeuJn6UFqhcjyEHv6T7ZzVOv1Wy2LVosBHYZJ9SZ/SqLWkvqUIJcEZkimZ8IUg4K473+231jcficttKtL1C7uPlIj1o+06akT8NxfvRAeQREGldy2tv/EdgrxjtFVsLY+ptlGlxDBveO+n3BdtsjmHEgjv7Goafp102QbD23DDBJYevtzmM0luaxnCXkwynzx3FNdH1EWLm4H/AuHzA8I5/N7K3f0Oe5rT6bwi4XItfsYl9ai1ii50vVWVedOX3ZJWG5icAnHlHI7Ub0jbt23fKfQyD68fSttbeRXOgOCAfmJrUfogfymKHVHgiY3Vaay3lEHvP3P8A/R+9L9XctiFj+PYRWz1HRNO+TbAPqpK/wMUp6h+Drdwyt11PuAw/kf1pH4LIDzGjqU7zFdX0zYKCATzQ6aJEl2ctt/ieB+k/StXd/CepUQtxHHoSVP6iP1rKdTsEMLaLuc8KmSWIk8ekc+i13gsvMcuVW4MS9R1pX/UT2M/elun1JLjdjI9cEexP94px1HpG1Q+6bg+NDg/NR7elJ3IIgH6e4nNQp3sRpoipp21QVAJmAIGYwIHNIdXrVEycnk1TbW64ALDOIHOP4Uzu9ONtf8uGAk4mfrRMxbmAoCcQfoOi8a6u5TsGY/e/4r6FqOlb9pAERWBt6518wBFO9F1XUG2CkmfaarZcTE2DC1zRWukOssHmOB6Unv6J9zQYYmaP0+uvFYMhnQ7TGJ9/cUHrbF62U8YgqxgOvA+dIRX1HcSNQgljQuX/AHo5prrL/hqpC7jQ9jTlbjLbJI2yWn+FLNZrVsnNwsSPh9PrRjH4rV6QLrmFdR1twNgwsZJOAKTXeuQfLx70q6l1Frh5x2ApY12r2Pp0QcRRNzdDqh02pe2XZ03Hv2OY/lRi6i1qJt7drTMYnHdG/lSfqmnN1PGUAFVAK+o/eoj8O6UFfEukg8jsfnWKUw+D416W4JHr8O9xYMovWyikhu+J7gGiUdnWSefUzRa6izvLQGg/6TBPsSADRVzqHiYUkR2Mfxmnp1eTYLjJ9Tx+xkF9QmY01glyxEKCQauWyGeFwp5NPrdlCOSfXypH65qH/hJcEogj95Igf7hxHz2mri9SzHTpI96itu8RHSpacEGSuat6PrCL1x1MEiKn1Lorlj5hIweR9pFS6Xprdq6FYySP15pebS6MCbNRg3G080nWriXywGPzD1H9fSj+q9ES9N7ThVLiRtEKSBxHCn5QPUTNVPoVt3dx2lDIYExIPMHsRyD7Ud0HTFCVW54lpySnqCOVPvH845qn1GTw18TCaIAv0P8AY/SSSIN+Huq3wA14EEEL8x/Jqcavom66XT4H85+f7v15+9VdQ6WIOTtYjIPB7fLP6026NqP8Nk/NbJUj+B+Xb6VS6jOAv4jFtdg/ftOIBOkxbc0bcMzt6LJgegAGKnf6ZcIBC8dgRAHz7mr3ydwMlm247f8AeCflFXdI6kWvPb2q1oHBYDyj59/+ad0LZcnla7Pc/p/cA6UNiCaEQp3YJ4JnHscU20jeSJnb3FQ1uuFwTaVdgMDyxujBYGPXAoJ0QkHCMO6kKTH0k/Woy9QMTkXYG3bn9do4ZDQMM07kkyKxP411Ltd2gYQx9/8AvWsfXvu8qof+oZ+mDP0oe7f+LdbI3ckwe0cxSuhxnDmbMR5Tx/5vJ8VbImO0utuWQAMyPMJ/hTA613QIG55J4Hzpv1GxYhdyjP8A6h7+4/vNZa4rKzRm32nmtvBmx5xqSHY9Z9A/CHWygFi+wH/lsTg/6Z9fT+52VfCbuowBMz2ojRdW1SN/h6i4g4iZX/0nFaWPKVWjKz4gTYn26ur5Xp/xzrbfLWrw91Kk/wDpgU/0348fajXdHdAedptkPujmBg0zx07xZwsJp+vXymmvODBFtoJ7GIH61gf/AKedc01vxv2hraXlIAuuYLI0+UTxBXMRys016z+MNHqdNdtJd2XHWAtxSvcdz5f1r5D1LRXpDBCwjlIuD7pIoHfzAiMxp5SDtPr/AFX/AOovTR5Tuv5/Lbkf++AfpV/S7vSdYJsm2GONs7G+Ww4+wr41+HNHb1FxkuOVCrJAjccgQJ455g/LNaHUW9Np/wDJtDcBO9/OwORInAPyA5oC2r8wBhjDX5SZuup/gvTISyagWTMw4UifYAg1mdUVDN4mp3iIHhrBP1YY+UGs1e6qcliT8zXmmvMxB24Pc4H07mlkKTsI5Qw5Mf6b9l4Pi/VkI/8A0FNrep05KgMUUflQDPz9vpWSe5FUftEcVDY1bmTZE+lPrFIU22Xyz8RAj3+VKep9WhQHZSuZ+Z9BWLfXtHxGKB1GsJ5M0hekRTckseI/1v4kIXapnHMRP9+lZW9qyTJMnuaH1FyZofdFWgABQgGEvfqg3Pehmu1Ub9FUEmfT9Brsx7bRPEz/ACn9aD63bupcKs0RkEd59KJ670q5bHwyn7yng9p+n6k+tAo7X7YcgsyYf1jsayOnTGHXMtFW/wBHt/HxiSN95b0e/llEGRn58/evNRrYfaVjdwaK6ToBsd+FgxOJYilWm0rXbi7p2KYMc/Ie9aClNTsO1XBJrmNlsO/+VuIOD6T8zimVjpxtpBuS552zj+/lTTTaYQF3W7KjgFhP2mZ+f61TqRp7ZJfUkziFE/baMVkv1eTK1KaHsCxP+iIYBraCWr6pi/cKp+6zK5b3VRD/AFg81B1salx+zgBrf5nkN9cAEffk0EW6SpJ2XNx5Pnk/+6mWit9PmEdkLCIbdmR7/wBaNuoCKdONgfXTt9AZHh33lGv0F1hsuCT2IYSP7n0pborV7R3B4m7wXIncpEHsw/1KfTkVqLfSrirDOLiRhhMgdwRmV+WR78EMve05KXALunbicyvIgnEx2+1VceYlSoIYf8bo/EXwR6GSBp5h69XQm6jjJHA9YAJHpxPzq+4sasgGBcUSfcxx74Mf7qzut0ZNwXLWV/dPIAEAe9H6G7dY4EsxXzGcENJz2xJP+2s4oOx+/sQAxJoxrqNM9stEYJFoAZ80EsfUxAn2ilzXRp7RDCC0yzYAHt6mP41otNd3zcIgH4f9vr9eftSnqvSjqRIuhSJG2NwHzzzTcHVv4ptqHF+w9PvaN8IGZ3UfjG3shTPYALGP5CqLOte4q3l3BZ2sJgexH99qYdJ/D6WxcW49vdPxLx6QJHb09TWit2v8NUNs3ABEsAoMRGD24iR2q8/UdHgTRiFn77/3CA25i/pOmDpbvtCsGO4djtYrPzkUP+IbHg3BdBIS5zDbYcD+BGfvTB9cqAbl8KWIC5jGSYBA7817qwHRmD7to8wWcexBJzVDDkfHn8SvKSRW3BOw+R7/ACk1Q2mOvdXtEFrisvaQMTQmvG9QUIb0z/f/ABWhPUbZUq224pwZAB/XB/WhE6VbaTYIB/c4I/6TkH5VsZOpRDbIVrv2lcrRteZmNKRLEmABifX1q8XdokuJPE5orX6Ilh4qFT+8MbgRGexP2PrS3qf4cNpfEt3i6RIkQw+YyMe3zrRx5seTZTGK9zQ6TT24DODnscD5zNaA67TAWgw8yR4ZUkkf1HzrAL1ANbUM0D1/e4qy2yzuBxx3omxBuYzVNTe/DQewfDvo15n3eaYGSdvFeX+iW1tIb2nUXPzG0SsZ+KFMfpSex1EIoDuygHGwZJ9fce1bDQ9XTaFBFxnOxCR8QMlZHtmfkarZdScRqbiYC/prwushuMu043yxjlefUQamdG7RvvAxzCAfzorrfUP2h13L4bAldxAyAQMEZYCeCJAPegL3Tr4UspDgc7CxI98qKsq+28iq4jpdRZQDw7FtWj42m43zG8lV/wCkA+9LdTfpINdc4ry5qWPaj1TqhV3U0O9+hnuN6fWhi/1qJ0Lv6nFB+OaHuXKI6bobl9wltZPc9gPUnsKLgQbkGeqiC0wCQBJjt86dD8PnaDu3HfsKgFYPGScxPsK1vS+kaGPCua8KQfht28A8RuPIz6ZqQL3EBnA5mR6T+GRdWWu7Tg7QpIj3b1jtHemF7pGntkL4atgGTLTOeZ/StX+H+naBw0ai8twSDaO1g0DLIAsssSfWBkCmF3pPTQT5y3vuSPpAOKWVyX7Tg6VIXNWv+aJNpgDAkMBO044IBwR2kduJW+koAbthvKwO4AfEI7e9JOm3WNphILrc32xj83ldCPQg5HeTTvoTeHcKLuCMJ2sZKn2PccifYV5/N0zYcbPjPHI7MOfrXf1uQoBiDVdShggIZAOBwBGSfeq1ueIw2tFsD4fXHc08/EOhtWQz+HPiN5oxAiY+RbMe3tWf092TttwIEtIwPb61t9FlTPjDoNvu/wDf3vEutHeTvWgohVwwB/7UpF7eDgzOD8qN1epu21VNgPYMD6+tUC7dQ7jAC8jbIq2dpC7zrIEMWAIjk9zVmiLeItxuY8qjsR60tOtDAqDk89lU026U4sidsk8h8qR3zyP0pZBoxgO8Yn8RXReCi6bYA5jcCcyAveTjtzWn02rs6mztJBDfEDgo8mHAHCk/xPvWTSxpr7BhbZWBggEMuBzJhh+vFMumdLW2xaYJYhoGSpAgc9jB74FZvU4cZW6ph394ZsyRvvZuKt0HzExOJCxHHtNN+p9Utjd4ZINxcj0JOfqQM0h67F02HnzC4EcT2BHmGfTn5TSV7zG8ADO3d+inNZuTDqctx6yuzkEzR9R60wW1anMQFXk9gCB3xx8qnotdcvB1tWgCcu8GQB2AE/IAf80p1qJYRdm5nMm5cA8xBMBUHYGD7nvT67rDatrtV1UcDO31yREkjJNdj6cHH5R+0ZiRmO52kLPTro2llcExzICg+wGD9aKGp1LFkSNywScMAs8Ec5zFXdE61v3eGSShhwSYAJOQJGQYE+lS1Pi79wUOgBZi8Fp7KGBHH1496f8AhlP5lG3t/MsqoXYQfRdUZ3uIbtkhBuYMDgerdh8iKOs2UV7jJb2sRDGGVXxg5AEgHmPafT3TXEay52yJi5MAjHEgZieD3pWNPdYk6e55QSzbgZQwQADx3yM8UvJ0uFlNeXbtx9OO0IodzM7a6bdsg7hIGMAmB3n0+tB/tr+KEtuFaRB5kA9xwTFanqF5lChntOXEDYwl47REBgZIMweIzSLU3BZ3OEtQx8rcmYMckDtxWviyNkBTKBf+jEVvUd3+rBT4d6GRsBmEf9LTlTGZODzI4pX1PSrbXLE2jMNnHqrgEdu/oKU2NXfvpcktcAYA4XaJmSRGADExxuHtTjpOju7CCV8P3IABBEAFjJGf19Capfg/AfxMXA5H8SCO8zl/S2cLbAdY+IflJ5BPrQeosEKQGYEEYMR34P8AfFarU9PuIfCVTsJ3IU224gGQZMLGTkcECaD1PRrgtC6rkrLSBBIEwD7yQeMYGa1ceZXUEHmTpmcuOw2glSY9fvTHovXrlt0U9pIkd/Y+5FepsJLMLdxBAYfmz33A+T0mmfShbCuEVwGO0MkXGXE7SZ/L6xmueu4hLcl1vp+ouLafw9hXaSZUEbQfMZOZBA9cVLpPV79pms3BttHLMJBluCDwx4+1AvpmUbLdy7cWJMsBB7YP5TxTKzq7qr4aWWdVH+Wx3EgkyQsTHp6RS9Iqu0O4d1np1plDCwbkQC1sHfkHLRyfmO9ZnXdGu27XjC2TbM5PlYQY8ynPrxPBOK3nQ+qAI1mzZFtgS1xN5JmcwTg/OcGhtVqFdS6tdXaxGGkFpH5SDugiORMmq65Sh0xlE7z5TcuE8/aqSWOAM+gzWk/EltDsun4rlxw3lVCQoSPKMAmT2mOaC02ptpLW18uQd20sSREAxmPXEelXFJIsRLEXFVrpzkkspAGT3IHrHbnvTjT3dqFEUIGiZZm3R3n4QPtQdprhJcLCTtBzJgTHvjsTRVm5p5KuH3giECiJxPePScfKiI9YIMnquoLbtXRG64zIVck42klyB2JO3J7Kaxz3iWJDEGSf6Z5rUdc0m9cPG2REZAkCMxmccn0FZC+scGR8oz6exqxhIqV8o3hel1joZBz2PoQZBHoQQDNE3OvXp8rsB6b2+v8AcmlZRgJMCeAOT9PT3P0miOn9Ie6paYzGR7D+tOESZ9TW3aabi7tu1i6nDLCnOOVJGCPl6Us6Z1R2YtbYgIcF/T+YorU3Ail1dYzEgE5EFCPrmlvSumfCCSAxIC8gSYEH51nY8Y0kHccSyTU2wvpq7LbrmM7F4mJ2n54/jWe0mndwHKnwxMkEAwP51oejLpyTaG0ESBtMSVjdj6g/es/1Kbd65bQiNxkEEwCuD9Qf0rP/AMdWHPk6ccDcfpINkBpaOqaUIUWTn84z70tv9MvXm22pZSAZ4AHbcScUd0vo6FDfvFUsjljEnaeFPYTyfoM8Q1v4mV28PTlkE5YYP3/KIHPNXH6glimEWw5PYfH39hOHvPdN+DXWTcuKAeR8h6uVP2FMh0XTssftCCI5cmI+Qj9ayt28Q+0A3CZ5ctBPcmf40dplYKxOYjg8ziI55xUHDmItsn0AhAj0mh/8CuKpNopdHfa6j64OcVLTaG+xEPB4EAmB/EnHNIPw+7EtdbBkrG72nPtBx9a1Wl6utsbXMK4KllMNxMyTjtgfrSmVgGDnVXoKPw5gM9nSIo6nbCwreUht07fiI5+fv6UPrWV9XuUQDamBHAUJ29QPuar61p3RZDl7bS9t/qv0Jzz8qp0tqG8RjCwqzMQGIYY94+mao6L3u7+6gMDdQy/fTxkttcRoXc28fEYiE9wZgdxEelT/AA/qnui4rXNw2sVJUgjsVMTiJx3MYqNv8NNcutdvhVt/EpEhiPygqcYHc+oGc1punNZS3tAgyEVnkyTHAII2iRLQAKec2NVGNBZ9uAfjLiWIFptVvukeGiI8DdxJ9JMZ8vw4PvRW+/aYljaTTrPlOG/KQcnv5h8qT2etM111dQWQBjD4BmCDELgkZiu6ndsMiJdJO4xBJO0xPIIIw04znjNd5yaK7fX94RY+k0Ni8HS3tUFLgMzvIABg/AOIX4iQDV3/AIiLfCgIRuJUSIgkFjHOI9TB4pFoekqba2w58HYAm1zjzMdwMkMDugjkR9lvWOuutywlpdu4HeT5zZgnd5oOIBMxkTQpjDnSvvcLWKsx9+06YANtts9tti7mkENDeUiSQYBjJ7VO9pLV83LR2hmG4RDbXHPOCQexz9eENkWkIdVW3cbcyhtwYjCbisHwhuQ+aQYEYPBfQb2zczsjFyNjW4YSJ5ZfL6zE+WZqc+IsmpSdQ3Hx/j1gE2eIDq71lVNiyfOQRdZgWYbSokAQDlR6fD6VTZF0MrMN9sx52hRc3H/LZVaNnoTjPyrQa7pqHVK/lFp0a5EKVZ4IMj87zt5nk+1C6tlXUjyWdzEC122wJcvH5vLgR3I4Plfh6lXWxyRZ+/adpMaWgLqMihLqlRB8otsQzIwUA7kA2RMdzFZnqGpuAW7a23VQdijzT+7G7uYHqR5QYzTvSW0F86i3dlApQ2zhUAVT5c4A8pnjBjFX9QDNsK29yXgTEMIfaWhwOd0EeoaquPL4ebQRs249j3H7ya2mK1GntS1xfEG54Esqg52nt8IONx5/iDqUg+W2VgQCHIIMwQ3ecciB9qYa5jauGQhAaYAkCBtEzhiIn68nsTotclsl1d8jKs0xuEAAKIGSTx/zreYC4G1wfSNcld7EqAJRisse0AAlSP8AV2q+7prfiB0BYtnaJVgc4MYXIicjI44pOxAZgLlxcny7YJbvLen0qPi7FUrgEmXJXdMGQO+QRkR6VJUnidq9Zo7Ghx5H2biPKSDuaBIlTnzEicfDNFazRPLAM+FMA2wxwR5gEniQTJrH6d7juGUk+H5jwQoHcgmIgRHJiiLHVn37rjtnB8M7QBiD5eCImVjk8gkFZxsTCGQASvqCXCdttfEAOGUZ9yfQYOY4PvXuj6e5YeJZAAySwcT27cnnNML5VGdCbhZw7M+6PDVrkCAh2tJBbIAO0jaC0qlt6Em4wuPMSPKTk57kcT7famKbG0WeYdrBat2/gMHOwvMxgEiMfOJBntkKNCquZCruAgCTt4jMmZ57j+VMFS2pChGDAkkYYOMRkjGRx8uaqdmBbdZtBmPmdURCVPuMTkYzweaMAiCSDANZdgl2MsZ8omI7Ajn7Up1zK7KEWCDiADk9oHocDFN201x5AtWz23C2AJyJMDmecR7VRf1HhLKHzDB5zI4iT6+0UxaEBt+Ymu6BwQWkbu5xPuacdPXbaQAzyf8A3NQt3WM8IAWBOeRmI9Y7/rTDQWFC5ujnA2u0e0hfWacr6TvFMl8Tff8AhXiO6ghLwBLjBD+jA/vZ+kwZms+1wgylw+TAUxM4bcSO+ePamj9Tuu63gESDIGS0ejfMYI/pRXW9BbvqmstiQwhxiJk5P1kH/mshHODIMb/lbg+h9P4+keVB3ERjWXkNtmHnB3g95biY9VI+9O9TbF+8L0hLWwG/uwUgmV+Z4HzBpbcVCTvUQAMjkQABHygR8qJ6jetLbUKoZGXzAkhywA2H/p2xt7y3qKZlwlirLs24v2PP9e/zkCB9b6wt9gpQeEmEt5gYgEgfm/hSfRIofwxI34AlQCe0k8Uc6AQxQjcZJIwB8h96pS2S3iuGCzEqY5jv60/Gi4k0INpHJuE+AUdhe2hgCIDElSCBJPBEA+uPSlaah2I2FjOMTH8pj5Ux1jwAxCljgyxKjbnA5JM/oaI0qqJ8VQqt22wYzlQcjJBBB/LxBzxahZnH2hHTbW20nv5vmT8681FxSCCm5gYBDlfygkHsPnijv2diQiiWOBPsvf7VZc0q21DX2mByeIMQIXyngZMms8dQotvUwE/MSYqubhYa2s+Ep3bdxbYxeMMfykEfX7lz+HraG7b3EhRY3HPJFzbHzgwPc0o6n1tGtBEMKfhUSJA4kECOBBzQdjUwjG4N0W1ADEqPNdXOBO3aWOOZoSjZQTWn75jf/qxNxdjUNtAAOQtq4PLECJAMHuAxxPbiQOpa/YfDuLcSzbnxWUBcwTO0DMkg4gYpP+H+u201CBLKIoGDPnC7MlhwORgxwPSnHWer2L7sywdi+cyRgHytmBHm59IoVTwsgTSaqWA0S9J1TMLr2LaWywAUuQjQsyfhJyRwTnHHNEr0B7u//EDMxBk7XIZQeIjsWmce5oy11ZbtuEVbh2A+ZQAZuBSwkhQc8Tz6zUb99mZgpZTALH0hmPZ4H3PM8CBaLHsKkACd0+3c04/xLxKkkBbjDB2/lKGOSJHoMepvumwgYqAiOf8AMXzAtuMqFPnmO/ArH9SW6LSlluOEEsxUjP5j3ECBx2kz3Cq946jcUZRzwROe3duT+vpTF6cE6id4DZK7Td9U1iW7YUQRyAQsg+gnE/TvNR0vV7lwKiW2vXCYU7CygbYJUzgyOePuTWW6Z1fb8QBDTgkyPkO3/FN9H1e+bjLcfYhVmHbbtI2hRxMmds5CkZpjrpXYQVOo7xzfug2NiAeXc2GFzwwTtZFj97JieVI9ZV3L9sEXLlhEMqLQZVBjbA54OB8Yj+ITajqN5im0gecR2BY5YyuJgzPPmHJ581L6hyCEBAaZAD4E+ZhnbkDJxxnEVCYQoPvOL77TUWupJaVvCAQ5YrBJJZiA+3dKqZPJGOBFROvAssvjHH+L5jksXBB4CgYjHBPcnCTqNq+Qt1wDEAhApKA434Hv6e9e65USyjguEu7dwY7hGWEEAFWYLwZB24IIoPAWxq3Nw9d3BH6wh3SZYkmY9fTHzNCkXWYXAs2xzkDB/NEyB6n5V6iqTuHlBgQMYmOcmMfr7ii2tOqFiVVBkZMgehgYjPf0+lwiuIgGR1Wia5/llHcAQBulVMHJPxRxJ7d8VTbvBR4bArcUnJRe4/KTEd8g+tGXdIwkEFCTyDEEj4gFMHM8k+wpnp9xKJfXxhtIlV3NkEScbuDyIIjmg3AjNiYhvai6qg7doJJ3ADkD8xUyMevaljXgdxWCOOYA9Z+s9qZjTXxuWDPoYJwTB8vce3vS61pAZMkATOO8kc8fpRrVRbWIxXqRuoQHNtlB/fBZe+7MTH+knjtS5uqItzeF2oQAQvwhgWmPbIH0qq7bCsTkDtHAEcUEJcyvmmZHBB9xjPyrlxgcTi5mk1OuBVSvpMjjNW2l2bVcW85DHzc5xnZ7Z9Kyl1BbiSYkSATEyJ+pM5px1bXBl5G0RgKBAkSAeTx9x71JWQrS/UdQ2HaVYkEkyQCDzHwzie/GcUDc1ltjudJkHJGZ4+IAGfmPrQ+ovKyAEncJ244UR3mAPaKqs3lCQVLD1AJ7TAjng/apCicWMIuae0wGy4ykDloYDjuMg+4HfigL3UmBjy49c/btHyq/T2Gunai7QZngHAM4PEZ5inFz8MMp2q9sxglgszGfidTjjI7HtXFlU0TOCsdwI51nTmDF/OYBiSfnmRP1NaX8P2Yt3NM0rvU3FlgSDInjIzB+prq6svrTqwE+m4+IO0cFoxehSCykFuPEY4PtjHFApZc+bwgyg8uSR884Irq6rrHTAG5g/XrjZW4AQViARiR2jFILas2N52xGZJB3Dv24+1eV1MXiAeYwtagoBmQIGOc/M47+/wA6K09+7dg74SYPmzM8cc11dQtwTOj3W61rbJtHnMwArE+5AAOR6xUND0C/qWLm4VtzDMZaTkEKsZ/711dWMr+HgVwNz/cdgQNzPPxBZTT+Jbtj/ECsVLAE+VJMkAAABT2n39c/0xLl+w5Xc1wCQJAkrBglhH5zGeVHIrq6rwOnDq5OxhgBmqcNGvwhiu6FcHcX8jQwIHf+fNN2cqoW3YDWyRuDlCV8oKEEQfMHwGnIjvnq6pyNuJyLzDr+nv7ILIiqGUk+YGWX4FDeUiIAMdh5e3aCyCFtofMWClwsztZWUBFGODziPXFdXUlTak+8YRRhms6HbFzcvi7yAfEkcTwDBCMdxPlA5jA3Siv/AIdBRBZUM2S6NcCycEKu4jdgkn0g8Yrq6ow5m5nOi8QQfg++SJuWd/Phi6u7yjC+UFVIBGCe3arLfQdVdco1kARIUOCIBCzM+pA+tdXU/wDENA8FRCLOn1aeIbpbwlHNq6Nu4EHnlfzD6jmJq291u3uW1ukyBsVAD9TH6d5rq6rKKDuYljWwjC1qnG4sV5wBkjsCT3ME1R021aN4E2xIPYmD8xx3rq6pf8pgiXJorSXNTbXYGuhp3s4Dwd20kEBQMnB7VlTq2F1fFTyWwTGIIEgEmYOTNe11Dhu7J7AyWPlEO1d7eTtJgeUZJx3OYx/xVen1NxF5ll47RHvJk+9dXU8xYl+j1s3NwQLPMOVE+4GJM98fpB2o0AZiHty4wdm1JBBPnJbbuEdiDiY7V1dVfJ5SKlhNxvKF/DwEkMyQPjb4WkHcIYCI/wB5H6VYv4eQ2dhuWzdMPuBG4D8ojMcyYnnvEV1dSnZtBIPENVW6qBN+FwEG/wAMkiVDXZZhEwIZR8jj5VLQXz4QteEF5kEJtuH23SWHbuftNdXVHiEjf75kMgU7RW3SLRJ/+2KGcpBmOAyTyvqCMUXp9loAIuw4YuZdhHbI2g/1ie1dXUxWLbGBWnieP1NrjP8A4iGRtgkEt2yANkY9+KVXtXfY4JgYGTAyTA9pJr2uqwEA4iixM//Z"
                  title="Precision Agriculture Documentary"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="video-description">
                <p>This PBS documentary shows how farmers use cutting-edge technology to improve efficiency while minimizing environmental impact. Features real Georgia farmer Lee Nunn demonstrating auto-steer tractors and smart irrigation systems that align with your AgroSmart platform's vision.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Farming Tips Modal */}
      <AnimatePresence>
        {showFarmingTips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tips-modal-overlay"
            onClick={() => setShowFarmingTips(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="tips-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-title-section">
                  <FaLeaf className="modal-title-icon" />
                  <h2 className="modal-title">Expert Farming Tips</h2>
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowFarmingTips(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Subtitle */}
              <p className="modal-subtitle">
                Essential tips and best practices for successful farming. 
                Updated regularly based on season and conditions.
              </p>

              {/* Tips Grid */}
              <div className="tips-grid">
                {farmingTips.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="tip-category"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="tip-category-header" style={{ background: category.color }}>
                      <div className="tip-category-icon">{category.icon}</div>
                      <h3 className="tip-category-title">{category.title}</h3>
                    </div>
                    <ul className="tip-list">
                      {category.tips.map((tip, tipIndex) => (
                        <motion.li
                          key={tipIndex}
                          className="tip-item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + tipIndex * 0.05 }}
                        >
                          <FaCheckCircle className="tip-check" />
                          <span>{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Back to Home Button */}
              <motion.div
                className="modal-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="back-home-btn"
                  onClick={() => setShowFarmingTips(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHome />
                  <span>Back to Home</span>
                </motion.button>
              </motion.div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <p className="footer-text">
                  <FaStar className="footer-star" />
                  <span>Tip: These tips are personalized based on your location and season.</span>
                  <FaStar className="footer-star" />
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STYLES */}
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        /* Background Elements */
        .bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100vh;
          background: radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%);
          z-index: -1;
        }

        .floating-leaf {
          position: fixed;
          font-size: 2rem;
          opacity: 0.1;
          z-index: -1;
          animation: float 20s infinite ease-in-out;
        }

        .floating-leaf-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-leaf-2 {
          top: 60%;
          right: 15%;
          animation-delay: 5s;
        }

        .floating-leaf-3 {
          bottom: 20%;
          left: 20%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        /* Hero Section */
        .hero-section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 50px;
          color: #10B981;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .star-icon {
          color: #F59E0B;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }

        .title-line {
          display: block;
        }

        .highlight {
          background: linear-gradient(135deg, #10B981, #34D399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 2.5rem;
        }

        .highlight-text {
          color: #10B981;
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .cta-primary, .cta-secondary, .cta-video {
          padding: 0;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .cta-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          text-decoration: none;
          position: relative;
          z-index: 2;
        }

        .cta-primary {
          background: linear-gradient(135deg, #10B981, #34D399);
          color: white;
        }

        .cta-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #10B981, #34D399);
          filter: blur(20px);
          opacity: 0.6;
          animation: glow 2s infinite;
        }

        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }

        .cta-secondary {
          background: white;
          border: 2px solid #e2e8f0;
          color: #475569;
        }

        .cta-secondary .cta-link {
          color: #475569;
        }

        .cta-video {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #EF4444, #F87171);
          color: white;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .cta-video:hover {
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }

        .youtube-icon {
          font-size: 1.2rem;
        }

        .play-icon {
          font-size: 0.9rem;
        }

        /* Stats Grid REMOVED - No styles needed */

        /* Animated Crop Visual */
        .hero-visual {
          perspective: 1000px;
        }

        .animated-crop-widget {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transform: rotateY(-5deg);
          border: 1px solid #e2e8f0;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .crop-widget-header {
          background: linear-gradient(135deg, #1e293b, #475569);
          color: white;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .crop-icon {
          font-size: 1.2rem;
          color: #10B981;
        }

        .crop-timer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .timer-bar {
          width: 100px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .timer-progress {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #34D399);
          border-radius: 3px;
        }

        .timer-text {
          font-size: 0.8rem;
          opacity: 0.8;
          white-space: nowrap;
        }

        .crop-widget-content {
          padding: 2rem;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .crop-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .crop-emoji {
          font-size: 5rem;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          animation: pulse-crop 2s infinite ease-in-out;
        }

        @keyframes pulse-crop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .crop-info {
          text-align: center;
          width: 100%;
        }

        .crop-name {
          font-size: 1.8rem;
          color: #1e293b;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .crop-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
        }

        .crop-details {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .crop-details .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f8fafc;
          border-radius: 20px;
          color: #475569;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .crop-dots {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: auto;
        }

        .crop-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .crop-dot.active {
          opacity: 1;
          transform: scale(1.3);
        }

        .crop-dot:hover {
          transform: scale(1.2);
          opacity: 0.8;
        }

        .crop-widget-footer {
          padding: 1rem 2rem;
          background: #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #475569;
          margin-top: auto;
        }

        /* Features Section */
        .features-section {
          padding: 6rem 2rem;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .section-highlight {
          color: #10B981;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .feature-card {
          color: white;
          padding: 2.5rem 2rem;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .feature-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .feature-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .feature-desc {
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .feature-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .feature-stats {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .feature-arrow {
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-arrow {
          transform: translateX(5px);
        }

        /* Quick Actions */
        .actions-section {
          padding: 4rem 2rem;
          background: #f8fafc;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .action-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .action-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .action-title {
          font-size: 1.2rem;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #10B981, #34D399);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
        }

        /* Testimonials */
        .testimonials-section {
          padding: 6rem 2rem;
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-avatar {
          font-size: 2.5rem;
        }

        .testimonial-name {
          font-size: 1.2rem;
          color: #1e293b;
          margin: 0;
        }

        .testimonial-role {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0.25rem 0 0 0;
        }

        .testimonial-text {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
        }

        .star-filled {
          color: #F59E0B;
        }

        .star-empty {
          color: #e2e8f0;
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #1e293b, #475569);
          color: white;
          text-align: center;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 2.5rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .cta-primary-lg, .cta-secondary-lg {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-primary-lg {
          background: linear-gradient(135deg, #10B981, #34D399);
          color: white;
        }

        .cta-secondary-lg {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        /* Footer */
        .footer {
          background: #1e293b;
          color: white;
          padding: 3rem 2rem 2rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-logo-icon {
          font-size: 2rem;
          color: #10B981;
        }

        .footer-logo-title {
          font-size: 1.5rem;
          margin: 0;
        }

        .footer-logo-subtitle {
          color: #94a3b8;
          margin: 0.25rem 0 0 0;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: white;
        }

        .footer-social {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-copyright {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          font-size: 1.2rem;
        }

        /* Video Modal Styles */
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 1rem;
        }

        .video-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          background: #000;
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-description {
          padding: 1.5rem 2rem 2rem;
          background: #f8fafc;
          border-radius: 0 0 20px 20px;
        }

        .video-description p {
          color: #475569;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
        }

        /* Tips Modal Styles */
        .tips-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 2rem;
        }

        .tips-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          position: relative;
          animation: modalSlideUp 0.3s ease-out;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 2rem 2rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #10B981, #34D399);
          border-radius: 24px 24px 0 0;
          color: white;
        }

        .modal-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modal-title-icon {
          font-size: 2rem;
        }

        .modal-title {
          font-size: 2rem;
          margin: 0;
          font-weight: 700;
        }

        .modal-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .modal-subtitle {
          padding: 0 2rem;
          color: #64748b;
          font-size: 1.1rem;
          text-align: center;
          margin: 1.5rem 0 2rem;
        }

        .tips-grid {
          padding: 0 2rem 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .tip-category {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .tip-category:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .tip-category-header {
          padding: 1.5rem;
          color: white;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .tip-category-icon {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tip-category-title {
          font-size: 1.3rem;
          margin: 0;
          font-weight: 600;
        }

        .tip-list {
          padding: 1.5rem;
          list-style: none;
          margin: 0;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: #475569;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .tip-item:last-child {
          margin-bottom: 0;
        }

        .tip-check {
          color: #10B981;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .modal-actions {
          padding: 0 2rem 2rem;
          display: flex;
          justify-content: center;
        }

        .back-home-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #10B981, #34D399);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }

        .back-home-btn:hover {
          box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
          transform: translateY(-2px);
        }

        .modal-footer {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-radius: 0 0 24px 24px;
          text-align: center;
        }

        .footer-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        .footer-star {
          color: #F59E0B;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-actions {
            flex-direction: column;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .hero-visual {
            order: -1;
          }

          .animated-crop-widget {
            transform: none;
            max-width: 400px;
            margin: 0 auto;
          }

          .crop-widget-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .crop-timer {
            width: 100%;
            justify-content: center;
          }

          .crop-emoji {
            font-size: 4rem;
            width: 100px;
            height: 100px;
          }

          .crop-name {
            font-size: 1.5rem;
          }

          .crop-description {
            font-size: 0.9rem;
            max-width: 280px;
          }

          .features-grid,
          .actions-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .footer-container {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
          }

          /* Video Modal Responsive */
          .video-modal {
            max-height: 95vh;
            border-radius: 16px;
          }
          
          .hero-actions {
            flex-wrap: wrap;
          }
          
          .cta-video {
            width: 100%;
            justify-content: center;
          }
          
          /* Adjust hero actions for mobile */
          .hero-actions {
            flex-direction: column;
          }
          
          .cta-primary, .cta-secondary, .cta-video {
            width: 100%;
            justify-content: center;
          }

          /* Tips Modal Responsive */
          .tips-modal {
            max-height: 95vh;
            border-radius: 16px;
          }
          
          .tips-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem 1rem;
          }
          
          .modal-header {
            padding: 1.5rem 1rem 1rem;
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .modal-title {
            font-size: 1.5rem;
          }
          
          .modal-subtitle {
            padding: 0 1rem;
            font-size: 1rem;
          }
          
          .back-home-btn {
            width: 100%;
            justify-content: center;
          }
          
          .footer-text {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        /* HERO BACKGROUND SLIDER */
        .hero-section {
          position: relative;
          padding: 2rem 1rem 3rem;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: opacity;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.75)
          );
        }
        


      `}</style>
    </div>
  );
};

export default Home;