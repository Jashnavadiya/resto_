const FoodItem = require('../models/food');

// Create a new food item
const createFoodItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const foodItem = new FoodItem({ name, price });
        await foodItem.save();
        res.status(201).json(foodItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all food items
const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json(foodItems);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a food item by ID
const getFoodItemById = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.body.id);
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json(foodItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a food item by ID
const updateFoodItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const foodItem = await FoodItem.findByIdAndUpdate(
            req.body.id,
            { name, price },
            { new: true, runValidators: true }
        );
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json(foodItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a food item by ID
const deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndDelete(req.body.id);
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createFoodItem,getAllFoodItems,getFoodItemById,updateFoodItem,deleteFoodItem
}