import React, { useState, useEffect } from 'react';
import { createRecipe, getSubRecipes } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Card, Grid, Autocomplete, Snackbar, Alert } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useSnackbar } from '../context/SnackbarContext';

function RecipeForm() {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [allSubRecipes, setAllSubRecipes] = useState([]);
  const [selectedSubRecipes, setSelectedSubRecipes] = useState([]);
  const [categories, setCategories] = useState('');
  const [subRecipeSearch, setSubRecipeSearch] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    getSubRecipes().then((response) => setAllSubRecipes(response.data));
  }, []);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

  const handleSubRecipeAdd = (newValue) => {
    if (newValue && !selectedSubRecipes.find((sub) => sub._id === newValue._id)) {
      setSelectedSubRecipes([...selectedSubRecipes, newValue]);
    }
  };

  const handleSubRecipeRemove = (index) => {
    setSelectedSubRecipes(selectedSubRecipes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRecipe({
        title,
        instructions,
        ingredients,
        subRecipes: selectedSubRecipes.map((sub) => sub._id),
        categories: categories.split(',').map((cat) => cat.trim()),
      });
      showSnackbar('Recipe created successfully!', 'success');
      navigate('/recipes');
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || 'Failed to create recipe.',
        'error'
      );
    }
  };
  
  

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ padding: 4, backgroundColor: '#fef9f3' }}>
        <Typography variant="h4" gutterBottom>Add New Recipe</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: 2 }} />
          <TextField label="Instructions" multiline rows={4} fullWidth value={instructions} onChange={(e) => setInstructions(e.target.value)} sx={{ marginBottom: 2 }} />
          
          <Typography variant="h6">Ingredients</Typography>
          {ingredients.map((ing, index) => (
            <Grid container spacing={2} key={index} alignItems="center" sx={{ marginBottom: 1 }}>
              <Grid item xs={4}>
                <TextField label="Name" value={ing.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Quantity" value={ing.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Unit" value={ing.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={2}>
                <Button color="error" onClick={() => removeIngredient(index)}>
                  <RemoveCircle />
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button onClick={addIngredient} startIcon={<AddCircle />}>Add Ingredient</Button>

          <Typography variant="h6" sx={{ marginTop: 2 }}>Add Sub-Recipes</Typography>
          <Autocomplete
            options={allSubRecipes}
            getOptionLabel={(option) => option.name || ''}
            onChange={(e, newValue) => handleSubRecipeAdd(newValue)}
            inputValue={subRecipeSearch}
            onInputChange={(e, value) => setSubRecipeSearch(value)}
            renderInput={(params) => <TextField {...params} label="Search Sub-Recipes" fullWidth />}
          />
          {selectedSubRecipes.map((sub, index) => (
            <Box key={sub._id} sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <Typography>{sub.name}</Typography>
              <Button color="error" onClick={() => handleSubRecipeRemove(index)} sx={{ marginLeft: 2 }}>
                <RemoveCircle />
              </Button>
            </Box>
          ))}

          <TextField label="Categories (comma separated)" fullWidth value={categories} onChange={(e) => setCategories(e.target.value)} sx={{ marginTop: 2 }} />
          <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Create Recipe</Button>
        </form>
      </Card>
    </Box>
  );
}

export default RecipeForm;
