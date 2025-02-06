import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers:{
    'Content-Type': 'application/json',
  }
})

export const authAPI = {
  login: (email, password, role) => {
    return api.post('/user/login', { email, password, role })
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

export const profileAPI = {
  getProfile: () => {
    return api.get('/profile/profile');
  },

  updateProfile: (profileData) => {
    return api.post('profile/update', profileData)
  }
}

export const productAPI = {
  addProduct: (productData)=>{
    return api.post('/product/add',productData)
  },

  getUserProduct:(userId)=>{

    return api.get('/product/user/get')

  },

  getProducts: ()=>{
    return api.get('/product/get')
  },

  getProductById:(id)=>{
    return api.get('/product/getId/'+id);
  }
}

export const analyticsAPI = {
  getSellerAnalytics: (selectedPeriod)=>{
    return api.get('/analytics/get-seller-analytics?period='+selectedPeriod);
  },

  getBuyerAnalytics: ()=>{
    return api.get('/analytics/get-buyer-analytics');
  }
}