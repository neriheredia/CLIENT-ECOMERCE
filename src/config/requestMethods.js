import axios from 'axios';

const BASE_URL_PRODUCTION = 'https://back-ecomerce.vercel.app/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL_PRODUCTION,
});
