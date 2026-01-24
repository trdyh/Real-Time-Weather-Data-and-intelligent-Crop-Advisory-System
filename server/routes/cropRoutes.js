const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get current weather by location
router.post('/current', async (req, res) => {
    try {
        const { city, lat, lon } = req.body;
        let url;
        
        const apiKey = process.env.OPENWEATHER_API_KEY;
        
        if (city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        } else if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else {
            return res.status(400).json({ error: 'Please provide city or coordinates' });
        }
        
        const response = await axios.get(url);
        
        // Format weather data
        const weatherData = {
            main: {
                temp: response.data.main.temp,
                feels_like: response.data.main.feels_like,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                pressure: response.data.main.pressure,
                humidity: response.data.main.humidity,
                sea_level: response.data.main.sea_level,
                grnd_level: response.data.main.grnd_level
            },
            weather: response.data.weather.map(w => ({
                id: w.id,
                main: w.main,
                description: w.description,
                icon: w.icon
            })),
            wind: {
                speed: response.data.wind.speed,
                deg: response.data.wind.deg,
                gust: response.data.wind.gust
            },
            clouds: {
                all: response.data.clouds.all
            },
            rain: response.data.rain || { '1h': 0 },
            snow: response.data.snow || { '1h': 0 },
            sys: {
                country: response.data.sys.country,
                sunrise: response.data.sys.sunrise,
                sunset: response.data.sys.sunset
            },
            name: response.data.name,
            visibility: response.data.visibility,
            dt: response.data.dt,
            timezone: response.data.timezone,
            coord: response.data.coord
        };
        
        res.json({
            success: true,
            data: weatherData,
            location: `${weatherData.name}, ${weatherData.sys.country}`,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            pressure: weatherData.main.pressure,
            visibility: weatherData.visibility,
            sunrise: weatherData.sys.sunrise,
            sunset: weatherData.sys.sunset
        });
    } catch (error) {
        console.error('Weather API error:', error.response?.data || error.message);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch weather data',
            details: error.response?.data?.message || error.message
        });
    }
});

// Get 5-day forecast
router.post('/forecast', async (req, res) => {
    try {
        const { city, lat, lon } = req.body;
        let url;
        
        const apiKey = process.env.OPENWEATHER_API_KEY;
        
        if (city) {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        } else if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else {
            return res.status(400).json({ error: 'Please provide city or coordinates' });
        }
        
        const response = await axios.get(url);
        
        // Process forecast data
        const forecastData = response.data.list.map(item => ({
            dt: item.dt,
            dt_txt: item.dt_txt,
            main: {
                temp: item.main.temp,
                feels_like: item.main.feels_like,
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                pressure: item.main.pressure,
                humidity: item.main.humidity
            },
            weather: item.weather.map(w => ({
                id: w.id,
                main: w.main,
                description: w.description,
                icon: w.icon
            })),
            clouds: item.clouds,
            wind: item.wind,
            visibility: item.visibility,
            pop: item.pop, // probability of precipitation
            rain: item.rain,
            snow: item.snow
        }));
        
        // Group by day
        const dailyForecast = {};
        forecastData.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    date: date,
                    temps: [],
                    weather: [],
                    humidity: [],
                    wind: []
                };
            }
            dailyForecast[date].temps.push(item.main.temp);
            dailyForecast[date].weather.push(item.weather[0]);
            dailyForecast[date].humidity.push(item.main.humidity);
            dailyForecast[date].wind.push(item.wind.speed);
        });
        
        // Calculate daily averages
        const processedForecast = Object.values(dailyForecast).map(day => ({
            date: day.date,
            temp: {
                avg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
                min: Math.min(...day.temps),
                max: Math.max(...day.temps)
            },
            weather: day.weather.reduce((prev, curr) => 
                day.weather.filter(w => w.main === prev.main).length > 
                day.weather.filter(w => w.main === curr.main).length ? prev : curr
            ),
            humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
            windSpeed: Math.round(day.wind.reduce((a, b) => a + b, 0) / day.wind.length)
        })).slice(0, 5); // Get next 5 days
        
        res.json({
            success: true,
            city: response.data.city,
            forecast: processedForecast,
            hourly: forecastData.slice(0, 8) // Next 24 hours (3-hour intervals)
        });
    } catch (error) {
        console.error('Forecast API error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch forecast data'
        });
    }
});

// Get air quality data
router.post('/air-quality', async (req, res) => {
    try {
        const { lat, lon } = req.body;
        
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Please provide coordinates' });
        }
        
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
        const response = await axios.get(url);
        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Air quality API error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch air quality data'
        });
    }
});

module.exports = router;