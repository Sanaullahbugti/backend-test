const reviewService = require('../services/reviewsService');
const { validationResult } = require('express-validator');

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const reviews = await reviewService.getAllReviews(skip, limit);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new review
exports.addReview = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userId } = req.user;
        await reviewService.addReview(userId, req.body);
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedReview = await reviewService.updateReview(req.params.id, req.body);
        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await reviewService.deleteReview(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully', review: deletedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
