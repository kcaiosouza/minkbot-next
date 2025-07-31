import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://d88cb4fa8739.ngrok-free.app',
})