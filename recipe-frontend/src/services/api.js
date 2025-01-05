import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Recipe API
export const getRecipes = () => api.get('/recipes');
export const getRecipeById = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (data) => api.post('/recipes', data);
export const updateRecipe = (id, data) => api.put(`/recipes/${id}`, data);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

// Sub-Recipe API
export const getSubRecipes = () => api.get('/sub-recipes');
export const getSubRecipeById = (id) => api.get(`/sub-recipes/${id}`);
export const createSubRecipe = (data) => api.post('/sub-recipes', data);
export const updateSubRecipe = (id, data) => api.put(`/sub-recipes/${id}`, data);
export const deleteSubRecipe = (id) => api.delete(`/sub-recipes/${id}`);
