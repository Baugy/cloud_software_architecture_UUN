import React, { useEffect, useState } from 'react';
import { getRecipes, getSubRecipes, deleteRecipe, deleteSubRecipe } from '../services/api';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Box, Container, Divider, Snackbar, Alert } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { Delete } from '@mui/icons-material';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [subRecipes, setSubRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredSubRecipes, setFilteredSubRecipes] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  useEffect(() => {
    getRecipes().then((response) => {
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    });
    getSubRecipes().then((response) => {
      setSubRecipes(response.data);
      setFilteredSubRecipes(response.data);
    });
  }, []);

  const handleSearch = ({ searchTerm, filter }) => {
    const filterItems = (items, key) =>
      items.filter((item) =>
        (key === 'ingredient'
          ? item.ingredients?.some((ing) => ing.name.toLowerCase().includes(searchTerm.toLowerCase()))
          : key === 'category'
          ? item.categories?.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
          : item[key]?.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    setFilteredRecipes(filterItems(recipes, filter));
    setFilteredSubRecipes(filterItems(subRecipes, filter));
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      setFilteredRecipes((prev) => prev.filter((recipe) => recipe._id !== id)); // Update filtered list
      setSnackbar({ open: true, message: 'Recipe deleted successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Failed to delete recipe: ${error.response?.data?.message || error.message}`, severity: 'error' });
    }
  };
  
  const handleDeleteSubRecipe = async (id) => {
    try {
      await deleteSubRecipe(id);
      setSubRecipes((prev) => prev.filter((sub) => sub._id !== id));
      setFilteredSubRecipes((prev) => prev.filter((sub) => sub._id !== id)); // Update filtered list
      setSnackbar({ open: true, message: 'Sub-Recipe deleted successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Failed to delete sub-recipe: ${error.response?.data?.message || error.message}`, severity: 'error' });
    }
  };
  
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const sectionStyles = {
    marginTop: 4,
    marginBottom: 2,
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
    textDecorationColor: '#8c6f4f',
    fontWeight: 'bold',
  };

  const dividerStyles = {
    marginY: 4,
    borderColor: '#8c6f4f',
    borderWidth: '2px',
    opacity: 0.8,
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      {/* Title */}
      <Typography variant="h3" sx={{ fontFamily: 'Merriweather', color: '#5a3e2b', marginBottom: 2 }}>
        🍲 Welcome To Your Cooking App
      </Typography>
      <Divider sx={dividerStyles} />

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Recipes Section */}
      <Typography variant="h4" sx={sectionStyles}>
        Recipes
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} md={6} lg={4} key={recipe._id}>
              <Card sx={{ backgroundColor: '#fef9f3', height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{recipe.title}</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Categories: {recipe.categories?.join(', ') || 'N/A'}
                  </Typography>
                  <Typography variant="body2">{recipe.instructions.substring(0, 50)}...</Typography>
                  <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Link to={`/recipe/${recipe._id}`}>
                      <Button variant="outlined">VIEW DETAILS</Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteRecipe(recipe._id)}
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
      </Container>

      {/* Sub-Recipes Section */}
      <Divider sx={dividerStyles} />
      <Typography variant="h4" sx={sectionStyles}>
        Sub-Recipes
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {filteredSubRecipes.map((subRecipe) => (
            <Grid item xs={12} md={6} lg={4} key={subRecipe._id}>
              <Card sx={{ backgroundColor: '#fef9f3', height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{subRecipe.name}</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Categories: {subRecipe.categories?.join(', ') || 'N/A'}
                  </Typography>
                  <Typography variant="body2">{subRecipe.instructions.substring(0, 50)}...</Typography>
                  <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Link to={`/sub-recipe/${subRecipe._id}`}>
                      <Button variant="outlined">VIEW DETAILS</Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteSubRecipe(subRecipe._id)}
                    >
                      DELETE
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
         {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Home;
