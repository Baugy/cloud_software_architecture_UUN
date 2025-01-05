import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#8c6f4f' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🍲 Recipe Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
        <Button color="inherit" component={Link} to="/sub-recipes">Sub-Recipes</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
