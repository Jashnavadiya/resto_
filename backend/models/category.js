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
    images: {
        type: String,
        trim: true
    },
});

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    items: [itemSchema],
});

// Define the schema for a category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    image:{
        type: String,
        trim: true
    },
    subcategories: [subcategorySchema],
});


// Create and export the model
const Category = mongoose.model('Category', categorySchema);
const Subcategory=mongoose.model('Subcategory',subcategorySchema)
module.exports =  Category
  