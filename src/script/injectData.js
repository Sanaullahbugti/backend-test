const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const injectReviewData = async () =>
{

    // Check if Review model exists
    const Review = mongoose.models['reviews'] || require('../models/Review');

    // If Review model doesn't exist, create and seed it
    if (!mongoose.models['reviews'])
    {
        try
        {
            let isData = await Review.findOne({}).limit(1);
            if (!isData)
            {
                const dataFilePath = path.join(__dirname, 'data.json');
                const rawData = fs.readFileSync(dataFilePath);
                const reviewsData = JSON.parse(rawData);
                await Review.insertMany(reviewsData);
                console.log('Review model created and data inserted successfully.');
            }
            else
            {
                throw new Error("Review model already exists")
            }
        } catch (error)
        {
            console.error('Error seeding data:', error.message);
        }
    }
}
module.exports = injectReviewData