import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7084/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

