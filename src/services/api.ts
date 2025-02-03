import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const API_URL = process.env.API_URL || 'http://127.0.0.1:5000/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
