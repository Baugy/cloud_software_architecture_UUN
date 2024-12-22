🍕 Recipe Manager Backend
📚 Description
The Recipe Manager Backend is a RESTful API built with Node.js and Express.js, designed to manage recipes and their reusable components (like sauces, dough, or dressings). It supports CRUD operations, advanced validation rules for ingredients, and category-based filtering to help organize recipes efficiently.

This application is ideal for:

📋 Recipe Tracking: Create and manage detailed recipes.
🛠️ Reusable Components: Share common sub-recipes (e.g., sauces, dough).
📊 Categorization: Sort and search recipes by categories like "Italian," "Sauce," or "Dessert."

🚀 Features
✅ CRUD Operations for Recipes and Sub-Recipes
✅ Validation Rules for quantity and unit dependencies in ingredients
✅ Category-Based Filtering (e.g., filter by Sauce or Italian)
✅ Error Handling with meaningful validation messages
✅ Scalable Architecture with clean schema design

🛠️ Technologies Used
      Node.js
      Express.js
      MongoDB
      Mongoose
      Postman (for API testing)

📂 Project Structure
├── controllers/    # API logic
├── models/         # Database schemas (Recipe, SubRecipe, Ingredient)
├── routes/         # API routes
├── middlewares/    # Error handling & validation middleware
├── server.js       # Entry point
└── README.md       # Project documentation

📚 API Documentation
      Recipes Endpoints
        POST /api/recipes → Create a new recipe
        GET /api/recipes → Get all recipes
        GET /api/recipes/:id → Get a specific recipe by ID
        PUT /api/recipes/:id → Update a recipe
        DELETE /api/recipes/:id → Delete a recipe
        GET /api/recipes?category=Sauce → Filter recipes by category
      Sub-Recipes Endpoints
        POST /api/sub-recipes → Create a sub-recipe
        GET /api/sub-recipes → Get all sub-recipes
        GET /api/sub-recipes/:id → Get a specific sub-recipe
        PUT /api/sub-recipes/:id → Update a sub-recipe
        DELETE /api/sub-recipes/:id → Delete a sub-recipe
