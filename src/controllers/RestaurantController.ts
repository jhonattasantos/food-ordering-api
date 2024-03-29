import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

const create = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId })

        if (existingRestaurant) {
            return res.status(409).json({ message: 'Restaurant already exists' });
        }

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString('base64');
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();
        res.status(201).json(restaurant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating restaurant' });
    }
}

const getOne = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting restaurant' });
    }
}

export default { create, getOne };