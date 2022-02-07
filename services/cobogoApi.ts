import axios from 'axios';

const TOKEN = process.env.NEXT_PUBLIC_COBOGO_API_TOKEN;

const api = axios.create({
  baseURL: 'http://localhost:1337',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default api;
