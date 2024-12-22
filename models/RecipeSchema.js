// RecipeSchema.js
const mongoose = require('mongoose');
const IngredientSchema = require('./IngredientSchema');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: {
    type: [IngredientSchema]
  },
  instructions: {
    type: String,
  },
  subRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubRecipe' }],
  notes: { type: String },
  categories: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
