/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         overall:
 *           type: number
 *         verified:
 *           type: boolean
 *         reviewTime:
 *           type: string
 *         reviewerID:
 *           type: string
 *         asin:
 *           type: string
 *         style:
 *           type: object
 *           properties:
 *             Format:
 *               type: string
 *         reviewerName:
 *           type: string
 *         reviewText:
 *           type: string
 *         summary:
 *           type: string
 *         unixReviewTime:
 *           type: number
 */
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    overall: { type: Number, required: true, },
    verified: { type: Boolean, required: true, },
    reviewTime: { type: String, required: true, },
    reviewerID: { type: String, required: true, },
    asin: String,
    style: {
        Format: { type: String, required: false, },
    },
    reviewerName: { type: String, required: false, },
    reviewText: { type: String, required: false, },
    summary: { type: String, required: false, },
    unixReviewTime: { type: Number, required: true, },
});

module.exports = mongoose.model('Review', reviewSchema);
