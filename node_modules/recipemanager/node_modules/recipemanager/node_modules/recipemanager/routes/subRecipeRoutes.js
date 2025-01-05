// routes/subRecipeRoutes.js
const express = require('express');
const router = express.Router();
const {
    getSubRecipes,
    getSubRecipe,
    createSubRecipe,
    updateSubRecipe,
    deleteSubRecipe
} = require('../controllers/subRecipeController'); // Ensure this path is correct

// Routes
router.get('/', getSubRecipes);          // Get all sub-recipes
router.get('/:id', getSubRecipe);        // Get a specific sub-recipe by ID
router.post('/', createSubRecipe);       // Create a sub-recipe
router.put('/:id', updateSubRecipe);     // Update a sub-recipe by ID
router.delete('/:id', deleteSubRecipe);  // Delete a sub-recipe by ID

module.exports = router;
