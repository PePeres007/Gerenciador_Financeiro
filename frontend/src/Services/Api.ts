import axios from 'axios';

// Aqui configuramos a URL base da sua API em C#
export const api = axios.create({
  baseURL: 'https://localhost:7084/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

