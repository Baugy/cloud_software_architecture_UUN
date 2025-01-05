import React, { useState } from 'react';
import { createSubRecipe } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Card, Grid, Snackbar, Alert} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useSnackbar } from '../context/SnackbarContext';

function SubRecipeForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [categories, setCategories] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubRecipe({
        name,
        type,
        instructions,
        ingredients,
        categories: categories.split(',').map((cat) => cat.trim()),
      });
      showSnackbar('Sub-Recipe created successfully!', 'success');
      navigate('/sub-recipes');
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Failed to create Sub-Recipe.', 'error');
    }
  };
  
  
  
  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ padding: 4, backgroundColor: '#fef9f3' }}>
        <Typography variant="h4" gutterBottom>Add New Sub-Recipe</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ marginBottom: 2 }} />
          <TextField label="Type" fullWidth value={type} onChange={(e) => setType(e.target.value)} sx={{ marginBottom: 2 }} />
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
                <Button color="error" onClick={() => removeIngredient(index)}><RemoveCircle /></Button>
              </Grid>
            </Grid>
          ))}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2, alignItems: 'center' }}>
                <Button
                    onClick={addIngredient}
                    variant="outlined"
                    startIcon={<AddCircle />}
                    >
                    Add Ingredient
                </Button>
                <Button 
                    type="submit"
                    variant="contained" 
                    sx={{ flexShrink: 0 }}
                    >
                    CREATE SUB-RECIPE
                </Button>

            </Box>

        </form>

      </Card>
    </Box>
  );
}

export default SubRecipeForm;
