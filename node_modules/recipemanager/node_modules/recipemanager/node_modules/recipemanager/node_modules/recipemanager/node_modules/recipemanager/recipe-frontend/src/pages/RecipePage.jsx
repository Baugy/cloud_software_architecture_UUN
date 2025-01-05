import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../services/api';
import { Typography, Button, Card, CardContent, Box, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id).then((response) => setRecipe(response.data));
  }, [id]);

  const handleDelete = async () => {
    await deleteRecipe(id);
    navigate('/recipes');
  };

  if (!recipe) return <Typography>No Recipes Found</Typography>;

  return (
    <Card sx={{ padding: 4, backgroundColor: '#fef9f3' }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>{recipe.title}</Typography>
        
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h5" fontWeight="bold">Ingredients:</Typography>
        {recipe.ingredients.map((ing, index) => (
          <Typography key={index} variant="body1">{`${ing.name} - ${ing.quantity} ${ing.unit}`}</Typography>
        ))}
        
        <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 2 }}>Instructions:</Typography>
        <Typography variant="body1">{recipe.instructions}</Typography>

        {/* Sub-Recipes Section */}
        {recipe.subRecipes?.length > 0 && (
          <>
            <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 'bold' }}>Sub-Recipes:</Typography>
            {recipe.subRecipes?.map((subRecipe, index) => (
              <Card key={index} sx={{ marginTop: 2, padding: 2, backgroundColor: '#f9f9f9' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{subRecipe.name}</Typography>
                  <Typography variant="body1"><strong>Type:</strong> {subRecipe.type}</Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}><strong>Instructions:</strong> {subRecipe.instructions}</Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ingredients:</Typography>
                    {subRecipe.ingredients.map((ing, index) => (
                      <Typography key={index} sx={{ marginLeft: 2 }}>
                        {`${ing.name} - ${ing.quantity} ${ing.unit}`}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {/* Action Buttons */}
        <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate(`/edit-recipe/${id}`)}>
            Edit Recipe
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete} startIcon={<Delete />}>
            Delete Recipe
          </Button>
          <Button variant="outlined" onClick={() => navigate('/recipes')}>
            Back to Recipes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecipePage;
