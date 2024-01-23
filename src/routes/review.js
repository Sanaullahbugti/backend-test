const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing reviews
 * 
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       '200':
 *         description: Successfully retrieved reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       description: Review object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '201':
 *         description: Successfully created a review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Review added successfully
 * 
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated review object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Successfully updated the review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 */

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get a single review by ID
router.get('/:id', reviewController.getReviewById);

// Create a new review
router.post(
    '/',
    [
        body('overall').isNumeric(),
        body('verified').isBoolean(),
        body('reviewTime').isString(),
        body('asin').isString(),
        body('reviewerName').isString(),
        body('reviewText').isString(),
        body('summary').isString(),
        body('unixReviewTime').isNumeric(),
    ],
    reviewController.addReview
);

// Update a review by ID
router.put('/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
