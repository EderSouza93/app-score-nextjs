import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default api 