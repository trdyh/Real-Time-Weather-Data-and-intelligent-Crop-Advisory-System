const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scientificName: String,
    suitableTemperature: {
        min: Number,
        max: Number,
        optimal: Number
    },
    suitableHumidity: {
        min: Number,
        max: Number
    },
    suitableRainfall: {
        min: Number,
        max: Number
    },
    soilType: [String],
    season: [String],
    growthDuration: Number, // in days
    waterRequirements: String,
    fertilizers: [String],
    pests: [String],
    diseases: [String],
    harvestingTips: [String],
    imageUrl: String,
    animation: String // Animation type for frontend
});

module.exports = mongoose.model('Crop', cropSchema);