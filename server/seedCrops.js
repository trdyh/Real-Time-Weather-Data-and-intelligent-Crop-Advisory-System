const mongoose = require('mongoose');
const Crop = require('./models/Crop');
require('dotenv').config();

const cropsData = [
    {
        name: "Wheat",
        scientificName: "Triticum aestivum",
        suitableTemperature: { min: 10, max: 25, optimal: 18 },
        suitableHumidity: { min: 30, max: 70 },
        suitableRainfall: { min: 300, max: 900 },
        soilType: ["Loamy", "Clay Loam", "Sandy Loam"],
        season: ["Winter", "Rabi", "Spring"],
        growthDuration: 120,
        waterRequirements: "Moderate",
        fertilizers: ["Nitrogen", "Phosphorus", "Potassium"],
        pests: ["Aphids", "Armyworm"],
        diseases: ["Rust", "Smut"],
        harvestingTips: ["Harvest when grains are hard", "Use combine harvester"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "wheat"
    },
    {
        name: "Rice",
        scientificName: "Oryza sativa",
        suitableTemperature: { min: 15, max: 35, optimal: 25 },
        suitableHumidity: { min: 60, max: 90 },
        suitableRainfall: { min: 1000, max: 2500 },
        soilType: ["Clay", "Clay Loam", "Loamy"],
        season: ["Summer", "Kharif", "Monsoon"],
        growthDuration: 150,
        waterRequirements: "High",
        fertilizers: ["Nitrogen", "Silicon"],
        pests: ["Stem Borer", "Leaf Folder"],
        diseases: ["Blast", "Bacterial Blight"],
        harvestingTips: ["Harvest when 80% grains are ripe", "Cut close to ground"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "rice"
    },
    {
        name: "Maize",
        scientificName: "Zea mays",
        suitableTemperature: { min: 15, max: 32, optimal: 22 },
        suitableHumidity: { min: 40, max: 80 },
        suitableRainfall: { min: 500, max: 1200 },
        soilType: ["Sandy Loam", "Loamy", "Clay Loam"],
        season: ["Summer", "Kharif", "Rainy"],
        growthDuration: 90,
        waterRequirements: "Moderate",
        fertilizers: ["Nitrogen", "Zinc"],
        pests: ["Stem Borer", "Armyworm"],
        diseases: ["Leaf Blight", "Rust"],
        harvestingTips: ["Harvest when kernels are hard", "Dry properly before storage"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "maize"
    },
    {
        name: "Barley",
        scientificName: "Hordeum vulgare",
        suitableTemperature: { min: 12, max: 25, optimal: 18 },
        suitableHumidity: { min: 30, max: 65 },
        suitableRainfall: { min: 400, max: 800 },
        soilType: ["Loamy", "Sandy Loam", "Clay Loam"],
        season: ["Winter", "Rabi"],
        growthDuration: 110,
        waterRequirements: "Low to Moderate",
        fertilizers: ["Nitrogen", "Phosphorus"],
        pests: ["Aphids", "Wireworms"],
        diseases: ["Powdery Mildew", "Rust"],
        harvestingTips: ["Harvest when grains are hard and dry", "Store in cool dry place"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "wheat"
    },
    {
        name: "Potato",
        scientificName: "Solanum tuberosum",
        suitableTemperature: { min: 15, max: 25, optimal: 20 },
        suitableHumidity: { min: 50, max: 80 },
        suitableRainfall: { min: 300, max: 700 },
        soilType: ["Sandy Loam", "Loamy", "Well-drained"],
        season: ["Winter", "Spring", "Autumn"],
        growthDuration: 90,
        waterRequirements: "Moderate",
        fertilizers: ["Potassium", "Phosphorus"],
        pests: ["Colorado Potato Beetle", "Aphids"],
        diseases: ["Late Blight", "Early Blight"],
        harvestingTips: ["Harvest when leaves turn yellow", "Cure potatoes before storage"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "vegetables"
    },
    {
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        suitableTemperature: { min: 18, max: 30, optimal: 24 },
        suitableHumidity: { min: 40, max: 70 },
        suitableRainfall: { min: 400, max: 800 },
        soilType: ["Sandy Loam", "Loamy", "Well-drained"],
        season: ["Summer", "Spring", "Autumn"],
        growthDuration: 70,
        waterRequirements: "Moderate",
        fertilizers: ["Nitrogen", "Potassium", "Calcium"],
        pests: ["Tomato Hornworm", "Whiteflies"],
        diseases: ["Blossom End Rot", "Early Blight"],
        harvestingTips: ["Harvest when fully colored", "Pick regularly to encourage more fruit"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "vegetables"
    },
    {
        name: "Lettuce",
        scientificName: "Lactuca sativa",
        suitableTemperature: { min: 10, max: 22, optimal: 16 },
        suitableHumidity: { min: 50, max: 80 },
        suitableRainfall: { min: 300, max: 600 },
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        season: ["Spring", "Autumn", "Winter"],
        growthDuration: 45,
        waterRequirements: "Moderate",
        fertilizers: ["Nitrogen", "Potassium"],
        pests: ["Aphids", "Slugs"],
        diseases: ["Downy Mildew", "Bacterial Leaf Spot"],
        harvestingTips: ["Harvest in morning for crispness", "Cut above ground level"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "vegetables"
    },
    {
        name: "Carrot",
        scientificName: "Daucus carota",
        suitableTemperature: { min: 15, max: 25, optimal: 20 },
        suitableHumidity: { min: 40, max: 70 },
        suitableRainfall: { min: 250, max: 500 },
        soilType: ["Sandy Loam", "Loamy", "Well-drained"],
        season: ["Spring", "Autumn", "Winter"],
        growthDuration: 75,
        waterRequirements: "Moderate",
        fertilizers: ["Potassium", "Phosphorus"],
        pests: ["Carrot Fly", "Aphids"],
        diseases: ["Leaf Blight", "Root Rot"],
        harvestingTips: ["Harvest when tops are 1-2 cm diameter", "Loosen soil before pulling"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "vegetables"
    },
    {
        name: "Onion",
        scientificName: "Allium cepa",
        suitableTemperature: { min: 13, max: 28, optimal: 20 },
        suitableHumidity: { min: 40, max: 70 },
        suitableRainfall: { min: 300, max: 600 },
        soilType: ["Sandy Loam", "Loamy", "Well-drained"],
        season: ["Winter", "Spring"],
        growthDuration: 100,
        waterRequirements: "Moderate",
        fertilizers: ["Nitrogen", "Phosphorus", "Potassium"],
        pests: ["Thrips", "Onion Fly"],
        diseases: ["Downy Mildew", "Purple Blotch"],
        harvestingTips: ["Harvest when tops fall over", "Cure in sun for 2-3 days"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "vegetables"
    },
    {
        name: "Cabbage",
        scientificName: "Brassica oleracea",
        suitableTemperature: { min: 15, max: 25, optimal: 18 },
        suitableHumidity: { min: 50, max: 80 },
        suitableRainfall: { min: 350, max: 600 },
        soilType: ["Loamy", "Clay Loam", "Well-drained"],
        season: ["Winter", "Spring", "Autumn"],
        growthDuration: 80,
        waterRequirements: "Moderate",
        fertilizers: ["Nitrogen", "Boron"],
        pests: ["Cabbage Worm", "Aphids"],
        diseases: ["Black Rot", "Clubroot"],
        harvestingTips: ["Harvest when heads are firm", "Cut at base with sharp knife"],
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        animation: "vegetables"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Crop.deleteMany({});
        await Crop.insertMany(cropsData);
        console.log('Database seeded successfully with 10 crops');
        console.log('Crops added:');
        cropsData.forEach(crop => {
            console.log(`- ${crop.name}: ${crop.suitableTemperature.min}-${crop.suitableTemperature.max}°C`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();