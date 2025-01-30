import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers:{
    'Content-Type': 'application/json',
  }
})

export const authAPI = {
  login: (email, password) => {
    return api.post('/user/login', { email, password })
  },

  logout: () => {
    return api.get('/user/logout')
  },

  register: (userData) => {
    return api.post('/user/register', userData);
  },

  getCurrentUser: () => {
    return api.get('/user/user')
  }
}