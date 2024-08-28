const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String, 
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
});

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    item: [itemSchema],
});

// Define the schema for a category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    image:{
        type: String,
        trim: true
    },
    subcategories: [subcategorySchema],
});

const RestoSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
    },
    category: [categorySchema],
});

const Resto = mongoose.model('Resto', RestoSchema);

module.exports = Resto;