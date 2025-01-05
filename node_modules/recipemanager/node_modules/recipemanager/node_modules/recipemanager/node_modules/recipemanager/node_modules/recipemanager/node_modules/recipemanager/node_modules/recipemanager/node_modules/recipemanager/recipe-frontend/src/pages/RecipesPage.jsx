import React, { useEffect, useState } from 'react';
import { getRecipes, deleteRecipe } from '../services/api';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { Delete, Visibility, Add } from '@mui/icons-material';
import { useSnackbar } from '../context/SnackbarContext';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    getRecipes().then((response) => setRecipes(response.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      showSnackbar('Recipe deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to delete recipe.', 'error');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>Recipes</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button component={Link} to="/add-recipe" variant="contained" startIcon={<Add />}>
          Add Recipe
        </Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card sx={{ backgroundColor: '#fef9f3', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>{recipe.title}</Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {recipe.instructions.substring(0, 50)}...
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Categories: {recipe.categories?.join(', ') || 'N/A'}
                </Typography>

                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button component={Link} to={`/recipe/${recipe._id}`} variant="outlined" startIcon={<Visibility />}>
                    VIEW DETAILS
                  </Button>
                  <Button
                    onClick={() => handleDelete(recipe._id)}
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                  >
                    DELETE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecipesPage;
