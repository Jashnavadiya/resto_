const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
   
const FoodItem = mongoose.model('FoodItem', FoodItemSchema);

module.exports = FoodItem;