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

export default { create };