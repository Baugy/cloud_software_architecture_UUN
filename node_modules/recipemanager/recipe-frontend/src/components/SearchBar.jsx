import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('title'); // Default filter: Title

  const handleSearch = () => {
    onSearch({ searchTerm, filter });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 4, alignItems: 'center' }}>
      {/* Filter Dropdown */}
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="ingredient">Ingredient</MenuItem>
        <MenuItem value="category">Category</MenuItem>
      </Select>

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Search />}
        onClick={handleSearch}
        sx={{
          height: '56px',
          paddingX: 3,
          fontSize: '1rem',
        }}
      >
        SEARCH
      </Button>
    </Box>
  );
}

export default SearchBar;
