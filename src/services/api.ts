import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://0df8-2804-29b8-507a-a7fe-f06e-f63e-8256-b4dc.ngrok-free.app',
})