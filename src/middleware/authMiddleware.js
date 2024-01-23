const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) =>
{
    const token = req.header('Authorization');

    if (!token)
    {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
    {
        if (err)
        {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Attach the decoded data to the request object for use in subsequent middleware or routes
        req.user = decoded;

        // Continue to the next middleware or route
        next();
    });
};

module.exports = authenticateJWT;
