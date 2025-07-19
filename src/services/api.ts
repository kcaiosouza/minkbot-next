import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://c2ebc19dda63.ngrok-free.app',
})