// __tests__/auth.test.js
const request = require('supertest');
const app = require('../src/appInstance'); // Import your Express app

describe('Authentication Endpoints', () =>
{
    it('should register a new user', async () =>
    {
        const res = await request("http://localhost:3000")
            .post('/auth/signup')
            .send({
                email: 'test12@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should authenticate a user', async () =>
    {
        const res = await request("http://localhost:3000")
            .post('/auth/login')
            .send({
                email: 'test1@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });
});

