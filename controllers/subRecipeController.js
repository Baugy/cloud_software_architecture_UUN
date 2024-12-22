// controllers/subRecipeController.js
const SubRecipe = require('../models/subRecipeSchema');

// Get all sub-recipes (with optional category filtering)
exports.getSubRecipes = async (req, res, next) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            filter.categories = category; // Filter by category
        }

        const subRecipes = await SubRecipe.find(filter);
        res.json(subRecipes);
    } catch (error) {
        console.error('❌ Error fetching sub-recipes:', error.message);
        next(error);
    }
};


// Get a single sub-recipe
exports.getSubRecipe = async (req, res, next) => {
    try {
        const subRecipe = await SubRecipe.findById(req.params.id);
        if (!subRecipe) return res.status(404).json({ error: 'Sub-Recipe not found' });
        res.json(subRecipe);
    } catch (error) {
        next(error);
    }
};

// Create a new sub-recipe
exports.createSubRecipe = async (req, res, next) => {
    try {
        const { name, type, ingredients, instructions, notes, categories } = req.body;

        const subRecipe = new SubRecipe({
            name,
            type,
            ingredients,
            instructions,
            notes,
            categories // Include categories
        });

        await subRecipe.save();
        res.status(201).json(subRecipe);
    } catch (error) {
        console.error('❌ Error creating sub-recipe:', error.message);
        next(error);
    }
};

// Update a sub-recipe
exports.updateSubRecipe = async (req, res, next) => {
    try {
        const subRecipe = await SubRecipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subRecipe) return res.status(404).json({ error: 'Sub-Recipe not found' });
        res.json(subRecipe);
    } catch (error) {
        next(error);
    }
};

// Delete a sub-recipe
exports.deleteSubRecipe = async (req, res, next) => {
    try {
        const subRecipe = await SubRecipe.findByIdAndDelete(req.params.id);
        if (!subRecipe) return res.status(404).json({ error: 'Sub-Recipe not found' });
        res.json({ message: 'Sub-Recipe deleted successfully' });
    } catch (error) {
        next(error);
    }
};
