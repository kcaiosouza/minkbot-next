import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://9300-2804-29b8-507a-a7fe-190-99e5-dfc3-ca15.ngrok-free.app',
})