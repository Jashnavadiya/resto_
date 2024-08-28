const Subcategory  =require('../models/category')

// Create a new category
const createSubCategory = async (req, res) => {
    try {
       await console.log(req.body)
        // const { name } = req.body;
        const subcategory = new Subcategory(req.body);
        await subcategory.save();
        res.status(201).json(subcategory);
        // res.status(201).json({ message: 'subcategory created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports={createSubCategory}