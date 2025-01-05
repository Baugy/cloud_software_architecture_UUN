// IngredientSchema.js
const mongoose = require('mongoose');

// Ingredient Schema
const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: false },
  unit: {
    type: String,
    required: function () {
      // Only require `unit` if `quantity` is defined
      return this.quantity !== undefined && this.quantity !== null;
    }
  }
});

// Validate if `quantity` exists and `unit` is missing
IngredientSchema.path('quantity').validate(function (value) {
  if (value && !this.unit) {
    this.invalidate(
      'unit',
      'Unit must be provided, when quantity is present'
    );
  }
  return true;
}, 'Unit must be provided, when quantity is present');

// Validate if `unit` exists and `quantity` is missing
IngredientSchema.path('unit').validate(function (value) {
  if (value && !this.quantity) {
    this.invalidate(
      'quantity',
      'Quantity must be provided, when unit is present'
    );
  }
  return true;
}, 'Quantity must be provided, when unit is present');

module.exports = IngredientSchema;
