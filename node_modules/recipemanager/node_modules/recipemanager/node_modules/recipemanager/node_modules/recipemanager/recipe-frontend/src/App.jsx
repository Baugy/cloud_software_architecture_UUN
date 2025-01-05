import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import RecipesPage from './pages/RecipesPage';
import SubRecipesPage from './pages/SubRecipesPage';
import RecipePage from './pages/RecipePage';
import RecipeForm from './components/RecipeForm';
import RecipeEdit from './components/RecipeEdit';
import SubRecipePage from './pages/SubRecipePage';
import SubRecipeForm from './components/SubRecipeForm';
import SubRecipeEdit from './components/SubRecipeEdit';
import Navbar from './components/Navbar';
import { SnackbarProvider } from './context/SnackbarContext';
import './App.css';

function App() {
  return (
    <Router>
      <SnackbarProvider>
        <CssBaseline />
        <Navbar />
        <Container
          sx={{
            marginTop: 4,
            padding: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/add-recipe" element={<RecipeForm />} />
            <Route path="/edit-recipe/:id" element={<RecipeEdit />} />
            <Route path="/sub-recipes" element={<SubRecipesPage />} />
            <Route path="/sub-recipe/:id" element={<SubRecipePage />} />
            <Route path="/add-sub-recipe" element={<SubRecipeForm />} />
            <Route path="/edit-sub-recipe/:id" element={<SubRecipeEdit />} />
          </Routes>
        </Container>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
