const express = require('express');
const router = express.Router();
const {createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory, addSubcategory, addItemsToSubcategory, updatesubcategory, updateItem, deleteSubCategory, deleteItem} = require('../controllers/category.controller');
const { createSubCategory } = require('../controllers/subcategory.controllers');


// Create a new category
router.post('/createCategory', createCategory);

// Add a subcategory to a category
router.post('/:id/createsubcategories', addSubcategory);

// Add items to a specific subcategory
router.post('/:categoryId/subcategories/:subcategoryId/createitems', addItemsToSubcategory);



router.put('/:id/updateCategory', updateCategory);



router.put('/:id/subcategories/:subId', updatesubcategory);
router.put('/:id/subcategories/:subId/items/:itemId', updateItem);






router.get('/getAllCategories', getAllCategories);
router.get('/:id', getCategoryById);

router.delete('/deleteCategory/:id', deleteCategory);
router.delete('/:id/subcategory/:subId/del', deleteSubCategory);
router.delete('/:id/subcategory/:subId/item/:itemId/del', deleteItem);





module.exports = router;