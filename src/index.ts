import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Enable CORS
app.use(cors());

// Your routes and middleware go here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});