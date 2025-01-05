const mongoose = require('mongoose');
const Recipe = require('./models/RecipeSchema');
const SubRecipe = require('./models/subRecipeSchema');
require('dotenv').config(); // If you're using environment variables for MongoDB connection

const clearDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('🔗 Connected to MongoDB');

        // Clear Recipes
        const recipeResult = await Recipe.deleteMany({});
        console.log(`🗑️ Deleted ${recipeResult.deletedCount} recipes`);

        // Clear Sub-Recipes
        const subRecipeResult = await SubRecipe.deleteMany({});
        console.log(`🗑️ Deleted ${subRecipeResult.deletedCount} sub-recipes`);

        mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error clearing database:', error.message);
    }
};

clearDatabase();
