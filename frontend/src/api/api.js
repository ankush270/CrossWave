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

  getProducts: ()=>{
    return api.get('/product/get')
  },

  getProductById:(id)=>{
    return api.get('/product/getId/'+id);
  }

}