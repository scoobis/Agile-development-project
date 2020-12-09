import axios from 'axios'
import { getUserToken } from './auth-cookies'

const BASE_URL = 'http://localhost:5001'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: process.browser && getUserToken()
  }
})

export default axiosInstance
