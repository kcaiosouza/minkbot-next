import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://5e26-2804-29b8-507a-d103-dcb5-ece3-2309-4532.ngrok-free.app',
})