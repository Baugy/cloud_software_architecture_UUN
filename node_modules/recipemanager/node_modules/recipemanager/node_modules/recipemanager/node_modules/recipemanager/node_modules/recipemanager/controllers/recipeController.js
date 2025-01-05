// controllers/recipeController.js
const Recipe = require('../models/RecipeSchema');

// Get all recipes (with optional category filtering)
exports.getRecipes = async (req, res, next) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            filter.categories = { $in: [category] };
        }
        
        const recipes = await Recipe.find(filter).populate('subRecipes');
        res.json(recipes);
    } catch (error) {
        console.error('❌ Error fetching recipes:', error.message);
        next(error);
    }
};


// Get a single recipe with populated subRecipes
exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate({
                path: 'subRecipes',
                model: 'SubRecipe' // Explicitly reference SubRecipe model
            });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
    try {
        const { title, ingredients, instructions, subRecipes, notes, categories } = req.body;

        // Ensure ingredients is an array of objects
        if (!Array.isArray(ingredients)) {
            throw new Error('Ingredients must be an array of objects.');
        }

        const recipe = new Recipe({
            title,
            ingredients,
            instructions,
            subRecipes,
            notes,
            categories
        });
        if (!Array.isArray(ingredients) || !ingredients.every(i => typeof i === 'object')) {
            throw new Error('Ingredients must be an array of objects with `name`, `quantity`, and `unit`.');
        }
        
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        console.error('❌ Error creating recipe:', error.message);
        next(error);
    }
};


// Update a recipe
exports.updateRecipe = async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
};
