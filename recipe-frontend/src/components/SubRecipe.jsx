import React, { useEffect, useState } from 'react';
import { getSubRecipes } from '../services/api';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Box, Container } from '@mui/material';

function SubRecipe() {
  const [subRecipes, setSubRecipes] = useState([]);

  useEffect(() => {
    getSubRecipes()
      .then((response) => setSubRecipes(response.data))
      .catch((error) => console.error('Error fetching sub-recipes:', error));
  }, []);

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontFamily: 'Merriweather', marginBottom: 4 }}>
        🍲 Manage Sub-Recipes
      </Typography>
      <Link to="/add-sub-recipe">
        <Button variant="contained" sx={{ backgroundColor: '#8c6f4f', marginBottom: 4 }}>
          ADD NEW SUB-RECIPE
        </Button>
      </Link>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {subRecipes.map((subRecipe) => (
            <Grid item xs={12} md={6} lg={4} key={subRecipe._id}>
              <Card sx={{ backgroundColor: '#fef9f3', height: '220px', padding: "4px"}}>
                <CardContent>
                  <Typography variant="h5">{subRecipe.name}</Typography>
                  <Typography variant="body2">{subRecipe.instructions.substring(0, 50)}...</Typography>
                  <Link to={`/sub-recipe/${subRecipe._id}`}>
                    <Button variant="outlined" sx={{ marginTop: 2 }}>VIEW DETAILS</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default SubRecipe;
