import { Request, Response } from 'express';
import User from '../models/user';

const create = async (req: Request, res: Response) => {
    try {

        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            return res.status(200).json(existingUser.toObject());
        }

        const user = new User(req.body);
        await user.save();

        res.status(201).json(user.toObject());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

const update = async (req: Request, res: Response) => {
    try{

        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        
        await user.save();

        res.send(user);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}

export default { create, update };