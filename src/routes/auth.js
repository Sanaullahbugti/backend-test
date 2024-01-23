/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User object to be registered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       '201':
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: User registered successfully
 */
router.post(
    '/signup',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
    ],
    authController.signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User credentials for authentication
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       '200':
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *               example:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjBmMjFkNjNkYjM4ODAwMTVhYjBhMDUiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE1OTk1MTIzOTcsImV4cCI6MTU5OTUxNjE5N30.K9IX7Sj0GIEzGS7d8rPtqUyPKxDy28qLMDcNtUWjHwY
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Invalid credentials
 */
router.post(
    '/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
    ],
    authController.login
);

module.exports = router;
