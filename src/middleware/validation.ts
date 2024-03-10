import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const hanldeValidationErrors = async(
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const validateUserRequest = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Name is required'),
    body('addressLine1')
        .isString()
        .notEmpty()
        .withMessage('Address is required'),
    body('city')
        .isString()
        .notEmpty()
        .withMessage('City is required'),
    body('country')
        .isString()
        .notEmpty()
        .withMessage('City is required'),
    hanldeValidationErrors,
];

export const validateRestaurantRequest = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Name is required'),
    body('city')
        .isString()
        .notEmpty()
        .withMessage('City is required'),
    body('country')
        .isString()
        .notEmpty()
        .withMessage('Country is required'),
    body('deliveryPrice')
        .isFloat({ min: 0})
        .notEmpty()
        .withMessage('Delivery price must be a positive number'),
    body('estimatedDeliveryTime')
        .isInt({ min: 0})
        .notEmpty()
        .withMessage('Estimated delivery time must be a positive number'),
    body('cuisine')
        .isArray()
        .withMessage('Cuisine must be an array')
        .not()
        .isEmpty()
        .withMessage('Cuisine array must not be empty'),
    body('menuItems')
        .isArray()
        .withMessage('Menu items must be an array'),
    body('menuItems.*.name').notEmpty().withMessage('Menu item name is required'),
    body('menuItems.*.price').isFloat({ min: 0}).withMessage('Menu item price must be a positive number'),
    hanldeValidationErrors
]