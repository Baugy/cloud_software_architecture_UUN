const express = require('express');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes'); // Check this import
const subRecipeRoutes = require('./routes/subRecipeRoutes'); // Check this import
const errorHandler = require('./middlewares/errorHandler'); // Check this import
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use('/api/recipes', recipeRoutes); // ✅ Should point to valid routes
app.use('/api/sub-recipes', subRecipeRoutes); // ✅ Should point to valid routes

// Error Handling Middleware (Always at the end)
app.use(errorHandler); // ✅ Should point to a valid function

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
