const express = require('express');
const router = express.Router();
const {createFoodItem, getAllFoodItems, getFoodItemById, updateFoodItem, deleteFoodItem} = require('../controllers/food.controller');

// CRUD routes
router.post('/createFoodItem', createFoodItem);
router.get('/getAllFoodItems', getAllFoodItems);
router.get('/getFoodItemById', getFoodItemById);
router.post('/updateFoodItem',updateFoodItem);
router.post('/deleteFoodItem', deleteFoodItem);



module.exports = router;
