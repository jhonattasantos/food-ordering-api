import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {console.log('Connected to MongoDB')})
    
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