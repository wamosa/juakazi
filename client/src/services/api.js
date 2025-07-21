import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // Change to your deployed URL if needed

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Auth token handling
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==================== AUTH ====================

// Register new user
export const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

// Login existing user
export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

// ==================== WORKERS ====================

// Create a new worker (auth required)
export const createWorker = async (workerData) => {
  const res = await api.post('/workers', workerData);
  return res.data;
};

// Get all workers with optional filters: skill, county
export const getWorkers = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await api.get(`/workers${query ? `?${query}` : ''}`);
  return res.data;
};

// Get a single worker by ID
export const getWorkerById = async (id) => {
  const res = await api.get(`/workers/${id}`);
  return res.data;
};

// Update a worker (auth required)
export const updateWorker = async (id, updateData) => {
  const res = await api.put(`/workers/${id}`, updateData);
  return res.data;
};

// Delete a worker (auth required)
export const deleteWorker = async (id) => {
  const res = await api.delete(`/workers/${id}`);
  return res.data;
};
export {api};
