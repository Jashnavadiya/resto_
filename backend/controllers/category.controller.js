const Category = require('../models/category');
const mongoose = require('mongoose');

// Create a new category with an empty subcategories array
const createCategory = async (req, res) => {
    try {
        console.log(req.body);
        
        const category = new Category({
            name: req.body.name,
            images: req.body.images,  // optional
            subcategories: []       // Initially empty
        });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a subcategory to a category
const addSubcategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        console.log(req.body);
        
        // Add new subcategory
        category.subcategories.push(req.body);
        await category.save();
        res.status(201).json(category.subcategories[category.subcategories.length - 1]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add items to a specific subcategory
const addItemsToSubcategory = async (req, res) => {
    try {
        console.log(req.params.categoryId);
        
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const subcategory = category.subcategories.id(req.params.subcategoryId);
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        // Add items to the subcategory
        subcategory.items.push(req.body);
        await category.save();
        res.status(201).json(subcategory.items[subcategory.items.length - 1]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const { _id, name, subcategories,images } = req.body;

        console.log('Request Body:', req.body);

        if (!_id) {
            return res.status(400).json({ error: 'Category ID is required' });
        }
        const category = await Category.findById(_id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        if (name) {
            category.name = name;
        }
        if (subcategories && Array.isArray(subcategories)) {
            // Assuming you want to replace the existing subcategories
            category.subcategories = subcategories;
        }
        if (images && Array.isArray(images)) {
            // Assuming you want to replace the existing subcategories
            category.images = images;
        }
        // Save the updated category
        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
    } catch (err) {
        console.error('Update Error:', err);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
const updatesubcategory = async (req, res) => {
    try {
        // Extract the parameters and body data
        const { name, items, _id } = req.body;
        const categoryId = req.params.id;  // ID of the category
        const subcategoryId = req.params.subId;  // ID of the subcategory

        console.log('Request Body:', req.body);
        console.log('Category ID:', categoryId);
        console.log('Subcategory ID:', subcategoryId);

      

        // Update the subcategory
        const category = await Category.findOneAndUpdate(
            { _id: categoryId, 'subcategories._id': subcategoryId },
            {
                $set: {
                    'subcategories.$.name': name,
                    'subcategories.$.items': items // Update items if provided
                }
            },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ error: 'Category or Subcategory not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Update Subcategory Error:', error); // Log error for debugging
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
const updateItem = async (req, res) => {
    try {
        // Extract parameters and request body data
        const { name, description, images } = req.body; // `images` is now an array
        const categoryId = req.params.id; // Category ID
        const subcategoryId = req.params.subId; // Subcategory ID
        const itemId = req.params.itemId; // Item ID

        console.log('Request Body:', req.body);
        console.log('Category ID:', categoryId);
        console.log('Subcategory ID:', subcategoryId);
        console.log('Item ID:', itemId);

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(categoryId) || !mongoose.Types.ObjectId.isValid(subcategoryId) || !mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ error: 'Invalid Category, Subcategory, or Item ID' });
        }

        // Update the item within the subcategory
        const category = await Category.findOneAndUpdate(
            { _id: categoryId, 'subcategories._id': subcategoryId, 'subcategories.items._id': itemId },
            {
                $set: {
                    'subcategories.$[sc].items.$[item].name': name,
                    'subcategories.$[sc].items.$[item].description': description,
                    'subcategories.$[sc].items.$[item].images': images // Set the images field as an array
                }
            },
            {
                arrayFilters: [{ 'sc._id': subcategoryId }, { 'item._id': itemId }],
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({ error: 'Category, Subcategory, or Item not found' });
        }

        console.log('Updated Category:', category); // Log updated category
        res.status(200).json(category);
    } catch (error) {
        console.error('Update Item Error:', error); // Log error for debugging
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const {id}=req.params;
        
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Filter out the subcategory
      category.subcategories = category.subcategories.filter(
        (subcat) => subcat._id.toString() !== req.params.subId
      );
  
      await category.save();
  
      res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const deleteItem = async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id, 'subcategories._id': req.params.subId });
  
      if (!category) {
        return res.status(404).json({ error: 'Category or subcategory not found' });
      }
  
      const subcategory = category.subcategories.id(req.params.subId);
  
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
  
      // Find the index of the item to be removed
      const itemIndex = subcategory.items.findIndex(item => item._id.toString() === req.params.itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Remove the item from the array
      subcategory.items.splice(itemIndex, 1);
  
      await category.save();
  
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
    createCategory,
    addSubcategory,
    addItemsToSubcategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    updatesubcategory,
    updateItem,
    deleteCategory,
    deleteSubCategory,
    deleteItem
};