const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI; // Add your MongoDB URI here

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['*', 'http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
}));

// Middleware for parsing JSON
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(session({
    secret: process.env.session_secret_key,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: MONGO_URI, // Use the MongoDB connection string from the environment variable
        // collectionName: 'sessions',
    }),
    cookie: { secure: false, httpOnly: true }
}));

// Example route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

