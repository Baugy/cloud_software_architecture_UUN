// models/SubRecipe.js
const mongoose = require('mongoose');
const IngredientSchema = require('./IngredientSchema');

const SubRecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    ingredients: [IngredientSchema], // Array of structured ingredients
    instructions: { type: String, required: true },
    notes: { type: String },
    categories: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubRecipe', SubRecipeSchema);


