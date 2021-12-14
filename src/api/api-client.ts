import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token');
const UNAUTHORIZED = 'Unauthorized';
export const apiClient = axios.create({
  headers: {Authorization: `Bearer ${AUTH_TOKEN}`},
});


apiClient.interceptors.response.use((response) => response, (error) =>{
  if (error.response.data.message === UNAUTHORIZED) {
    console.log('auth error', error);
  }

  return Promise.reject(error);
});
