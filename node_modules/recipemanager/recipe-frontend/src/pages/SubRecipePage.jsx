import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubRecipeById, deleteSubRecipe } from '../services/api';
import { Typography, Button, Card, CardContent, Box, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

function SubRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subRecipe, setSubRecipe] = useState(null);

  useEffect(() => {
    getSubRecipeById(id).then((response) => setSubRecipe(response.data));
  }, [id]);

  const handleDelete = async () => {
    await deleteSubRecipe(id);
    navigate('/sub-recipes');
  };

  if (!subRecipe) return <Typography>No Sub-Recipe Found</Typography>;

  return (
    <Card sx={{ padding: 4, backgroundColor: '#fef9f3' }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>{subRecipe.name}</Typography>
        <Typography variant="h5" fontWeight="bold">Type: {subRecipe.type}</Typography>
        
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h5" fontWeight="bold">Instructions:</Typography>
        <Typography variant="body1">{subRecipe.instructions}</Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 2 }}>Ingredients:</Typography>
        {subRecipe.ingredients.map((ing, index) => (
          <Typography key={index} variant="body1">{`${ing.name} - ${ing.quantity} ${ing.unit}`}</Typography>
        ))}

        {/* Action Buttons */}
        <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate(`/edit-sub-recipe/${id}`)}>
            Edit Sub-Recipe
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete} startIcon={<Delete />}>
            Delete Sub-Recipe
          </Button>
          <Button variant="outlined" onClick={() => navigate('/sub-recipes')}>
            Back to Sub-Recipes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SubRecipePage;
