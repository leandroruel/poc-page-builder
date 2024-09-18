import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Criação da instância do axios com a baseURL
const api = (idToken: string) => axios.create({
  baseURL: url,
  headers: {
    apiKey: apiKey,
    'ad-token': idToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
