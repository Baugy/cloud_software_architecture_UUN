import React, { useEffect, useState } from 'react';
import { getSubRecipes, deleteSubRecipe } from '../services/api';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { Delete, Visibility, Add } from '@mui/icons-material';
import { useSnackbar } from '../context/SnackbarContext';

function SubRecipesPage() {
  const [subRecipes, setSubRecipes] = useState([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    getSubRecipes().then((response) => setSubRecipes(response.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSubRecipe(id);
      setSubRecipes((prev) => prev.filter((sub) => sub._id !== id));
      showSnackbar('Sub-Recipe deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to delete sub-recipe.', 'error');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>Sub-Recipes</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button component={Link} to="/add-sub-recipe" variant="contained" startIcon={<Add />}>
          Add Sub-Recipe
        </Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {subRecipes.map((subRecipe) => (
          <Grid item xs={12} sm={6} md={4} key={subRecipe._id}>
            <Card sx={{ backgroundColor: '#fef9f3', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>{subRecipe.name}</Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {subRecipe.instructions.substring(0, 50)}...
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Categories: {subRecipe.categories?.join(', ') || 'N/A'}
                </Typography>

                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button component={Link} to={`/sub-recipe/${subRecipe._id}`} variant="outlined" startIcon={<Visibility />}>
                    VIEW DETAILS
                  </Button>
                  <Button
                    onClick={() => handleDelete(subRecipe._id)}
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

export default SubRecipesPage;
