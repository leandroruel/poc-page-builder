import axios from "axios";
import { useMsal } from "@azure/msal-react";

const url = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Criação da instância do axios com a baseURL
const api = axios.create({
  baseURL: url,
  headers: {
    apiKey: apiKey,
    'ad-token': useMsal().accounts[0]?.idToken
  },
});

export default api;
