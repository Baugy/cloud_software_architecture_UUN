import React, { useState, useEffect } from 'react';
import { getRecipeById, updateRecipe, getSubRecipes } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, Card, Grid, Autocomplete } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [subRecipes, setSubRecipes] = useState([]);
  const [selectedSubRecipes, setSelectedSubRecipes] = useState([]);
  const [categories, setCategories] = useState('');

  useEffect(() => {
    getRecipeById(id).then((response) => {
      const { title, instructions, ingredients, subRecipes, categories } = response.data;
      setTitle(title);
      setInstructions(instructions);
      setIngredients(ingredients || []);
      setSelectedSubRecipes(subRecipes || []);
      setCategories(categories?.join(', ') || '');
    });

    getSubRecipes().then((response) => setSubRecipes(response.data));
  }, [id]);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

  const handleSubRecipeChange = (_, newValue) => {
    setSelectedSubRecipes(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRecipe(id, {
      title,
      instructions,
      ingredients,
      subRecipes: selectedSubRecipes.map((sub) => sub._id),
      categories: categories.split(',').map((cat) => cat.trim()),
    });
    navigate('/recipes');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ padding: 4, backgroundColor: '#fef9f3' }}>
        <Typography variant="h4" gutterBottom>Edit Recipe</Typography>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Instructions */}
          <TextField
            label="Instructions"
            multiline
            rows={4}
            fullWidth
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Ingredients */}
          <Typography variant="h6">Ingredients</Typography>
          {ingredients.map((ing, index) => (
            <Grid container spacing={2} key={index} alignItems="center" sx={{ marginBottom: 1 }}>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Quantity"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Unit"
                  value={ing.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button color="error" onClick={() => removeIngredient(index)}>
                  <RemoveCircle />
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button onClick={addIngredient} startIcon={<AddCircle />}>Add Ingredient</Button>

          {/* Sub-Recipes */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>Add Sub-Recipes</Typography>
          <Autocomplete
            multiple
            options={subRecipes}
            getOptionLabel={(option) => option.name || ''}
            value={selectedSubRecipes}
            onChange={handleSubRecipeChange}
            renderInput={(params) => (
              <TextField {...params} label="Search Sub-Recipes" placeholder="Type to search..." />
            )}
            sx={{ marginTop: 2 }}
          />

          {selectedSubRecipes.map((sub, index) => (
            <Box key={sub._id} sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <Typography>{sub.name}</Typography>
              <Button color="error" onClick={() => setSelectedSubRecipes(selectedSubRecipes.filter((_, i) => i !== index))} sx={{ marginLeft: 2 }}>
                <RemoveCircle />
              </Button>
            </Box>
          ))}

          {/* Categories */}
          <TextField
            label="Categories (comma separated)"
            fullWidth
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            sx={{ marginTop: 2 }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Update Recipe</Button>
        </form>
      </Card>
    </Box>
  );
}

export default RecipeEdit;
