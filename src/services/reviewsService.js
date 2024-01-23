const { default: mongoose } = require( 'mongoose' );
const Review = require( '../models/Review' );
// Get all reviews
const getAllReviews = async ( skip, limit ) => {
    try {
        return await Review.find().skip( skip || 0 ).limit( limit || 10 );
    } catch ( error ) {
        throw new Error( error.message );
    }
};

// Get a single review by ID
const getReviewById = async ( reviewId ) => {
    try {
        return await Review.findById( reviewId );
    } catch ( error ) {
        throw new Error( error.message );
    }
};

// Create a new review
const addReview = async ( userId, reviewData ) => {
    try {
        const newReview = new Review( { ...reviewData, reviewerID: new mongoose.Types.ObjectId( userId ) } );
        await newReview.save();
    } catch ( error ) {
        throw new Error( error.message );
    }
};

// Update a review by ID
const updateReview = async ( reviewId, updatedData ) => {
    try {
        return await Review.findByIdAndUpdate( reviewId, updatedData, { new: true } );
    } catch ( error ) {
        throw new Error( error.message );
    }
};

// Delete a review by ID
const deleteReview = async ( reviewId ) => {
    try {
        return await Review.findByIdAndDelete( reviewId );
    } catch ( error ) {
        throw new Error( error.message );
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview,
};
