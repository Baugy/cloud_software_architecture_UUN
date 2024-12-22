const express = require('express');
const router = express.Router();
const {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

router.get('/', getRecipes);
router.get('/:id', getRecipe); // Ensure this is mapped to the correct controller
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
