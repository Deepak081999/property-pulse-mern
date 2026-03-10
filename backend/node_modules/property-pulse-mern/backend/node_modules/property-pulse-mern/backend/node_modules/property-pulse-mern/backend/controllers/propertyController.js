const Property = require('../models/Property');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const { validationResult } = require('express-validator');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 6;

        const skip = (page - 1) * pageSize;

        const total = await Property.countDocuments({});
        const properties = await Property.find({}).skip(skip).limit(pageSize);

        res.json({
            total,
            properties,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'username email');

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
const createProperty = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { type, name, description, location, beds, baths, square_feet, amenities, rates, seller_info } = req.body;

        // Handle file uploads
        let images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'propertypulse',
                });
                images.push(result.secure_url);
            }
        }

        const propertyData = {
            owner: req.user.id,
            type,
            name,
            description,
            location,
            beds: parseInt(beds),
            baths: parseInt(baths),
            square_feet: parseInt(square_feet),
            amenities: amenities ? amenities.split(',').map(item => item.trim()) : [],
            rates,
            seller_info,
            images,
        };

        const property = new Property(propertyData);
        await property.save();

        res.status(201).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Make sure user owns property
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { type, name, description, location, beds, baths, square_feet, amenities, rates, seller_info } = req.body;

        const propertyData = {
            type,
            name,
            description,
            location,
            beds: parseInt(beds),
            baths: parseInt(baths),
            square_feet: parseInt(square_feet),
            amenities: amenities ? amenities.split(',').map(item => item.trim()) : [],
            rates,
            seller_info,
        };

        property = await Property.findByIdAndUpdate(req.params.id, propertyData, {
            new: true,
        });

        res.json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Make sure user owns property
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await property.remove();

        res.json({ message: 'Property removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user properties
// @route   GET /api/properties/user/:userId
// @access  Private
const getUserProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.params.userId });

        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
const getFeaturedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ is_featured: true }).limit(3);

        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Search properties
// @route   GET /api/properties/search
// @access  Public
const searchProperties = async (req, res) => {
    try {
        const { location, propertyType } = req.query;

        let query = {};

        if (location) {
            query['location.city'] = { $regex: location, $options: 'i' };
        }

        if (propertyType) {
            query.type = propertyType;
        }

        const properties = await Property.find(query);

        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getUserProperties,
    getFeaturedProperties,
    searchProperties,
};