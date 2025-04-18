import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://8fc9-2804-29b8-507a-a7fe-1de5-71c5-6081-a805.ngrok-free.app',
})