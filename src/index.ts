import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import  { v2 as cloudinary } from 'cloudinary';

// Load environment variables from .env file
dotenv.config();

import UserRoute from './routes/UserRoute';
import RestaurantRoute from './routes/RestaurantRoute';

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {console.log('Connected to MongoDB')})

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
});

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoute);
app.use('/api/restaurants', RestaurantRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});