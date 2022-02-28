import axios from 'axios'
import { useSelector } from 'react-redux';

// const BASE_URL = "http://localhost:8000/api/";
const BASE_URL_PRODUCTION = "https://back-ecomerce.herokuapp.com/api/"
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken || ' ';
// const token = useSelector(state => state.currentUser.accessToken)
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDRhYWI3ZDUxNjliZWIyNTU5ZGIzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTQ5OTI5NywiZXhwIjoxNjQxNzU4NDk3fQ.Ya19JqJCiSvJrS_vlAY3Opk0RSjeNDW9F8qPrM97Vso"
// const RESULT = TOKEN.toString();
// console.log(TOKEN)
export const publicRequest = axios.create({
    baseURL: BASE_URL_PRODUCTION,
})

// export const userRequest = axios.create({
//     baseURL: BASE_URL_PRODUCTION,
//     headers: { token: `Bearer ${token}` }
// })