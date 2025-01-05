import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubRecipeById, updateSubRecipe } from '../services/api';
import { TextField, Button, Typography, Box, Card } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

function SubRecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subRecipe, setSubRecipe] = useState({
    name: '',
    type: '',
    instructions: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    categories: '',
  });

  useEffect(() => {
    getSubRecipeById(id).then((response) => setSubRecipe(response.data));
  }, [id]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...subRecipe.ingredients];
    updatedIngredients[index][field] = value;
    setSubRecipe({ ...subRecipe, ingredients: updatedIngredients });
  };

  const addIngredient = () =>
    setSubRecipe({
      ...subRecipe,
      ingredients: [...subRecipe.ingredients, { name: '', quantity: '', unit: '' }],
    });

  const removeIngredient = (index) =>
    setSubRecipe({
      ...subRecipe,
      ingredients: subRecipe.ingredients.filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSubRecipe(id, subRecipe);
    navigate('/sub-recipes');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ padding: 4, backgroundColor: '#fef9f3' }}>
        <Typography variant="h4" gutterBottom>
          Edit Sub-Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            value={subRecipe.name}
            onChange={(e) => setSubRecipe({ ...subRecipe, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Type"
            fullWidth
            value={subRecipe.type}
            onChange={(e) => setSubRecipe({ ...subRecipe, type: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Instructions"
            multiline
            rows={4}
            fullWidth
            value={subRecipe.instructions}
            onChange={(e) => setSubRecipe({ ...subRecipe, instructions: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h6">Ingredients</Typography>
          {subRecipe.ingredients.map((ing, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
              <TextField
                label="Name"
                value={ing.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                fullWidth
              />
              <TextField
                label="Quantity"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                fullWidth
              />
              <TextField
                label="Unit"
                value={ing.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                fullWidth
              />
              <Button color="error" onClick={() => removeIngredient(index)}>
                <RemoveCircle />
              </Button>
            </Box>
          ))}
          <Button onClick={addIngredient} startIcon={<AddCircle />} sx={{ marginBottom: 2 }}>
            Add Ingredient
          </Button>
          <TextField
            label="Categories (comma separated)"
            fullWidth
            value={subRecipe.categories}
            onChange={(e) => setSubRecipe({ ...subRecipe, categories: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
            Save Changes
          </Button>
          <Button variant="outlined" onClick={() => navigate('/sub-recipes')} sx={{ marginTop: 2, marginLeft: 2 }}>
            Cancel
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default SubRecipeEdit;
