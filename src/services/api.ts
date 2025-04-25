import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://3c9a-2804-29b8-507a-a7fe-6870-3acc-34d1-acc9.ngrok-free.app',
})