import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://eabfec1797b1.ngrok-free.app',
})