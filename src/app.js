const mongoose = require( 'mongoose' );
const expressWinston = require( 'express-winston' );
const winston = require( 'winston' );
const swaggerJsDoc = require( 'swagger-jsdoc' );
const swaggerUi = require( 'swagger-ui-express' );
const swaggerOptions = require( './swagger/swaggerOptions' );
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require( "./appInstance" )
const authRoutes = require( './routes/auth' );
const reviewRoutes = require( './routes/review' );
const authMiddleware = require( './middleware/authMiddleware' );
const injectReviewData = require( "./script/injectData" )

require( 'dotenv' ).config();

const PORT = process.env.PORT || 3005;
app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
// MongoDB connection
mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'MongoDB connection error:' ) );
db.once( 'open', async () => {
    winston.info( 'Connected to MongoDB' );
    injectReviewData();
} );

// Configure winston for production logs
const logger = winston.createLogger( {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File( { filename: 'logs/error.log', level: 'error' } ),
        new winston.transports.File( { filename: 'logs/combined.log' } ),
    ],
} );

// Use express-winston for logging HTTP requests in production
if ( process.env.NODE_ENV === 'production' ) {
    app.use( expressWinston.logger( {
        transports: [
            new winston.transports.Console(),
            new winston.transports.File( { filename: 'logs/http.log' } ),
        ],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.prettyPrint()
        ),
    } ) );
}

// Swagger setup
const swaggerSpec = swaggerJsDoc( swaggerOptions );
app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec ) );

// Routes
app.use( '/auth', authRoutes );
app.use( '/review', authMiddleware, reviewRoutes );

// Start server
app.listen( PORT, () => {
    logger.info( `Server is running on port ${ PORT }` );
} );
