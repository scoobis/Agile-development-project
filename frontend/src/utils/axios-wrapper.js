import axios from 'axios'
import { getUserToken } from './auth-cookies'
import { API_URL } from './config'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use((config) => {
  if (process.browser) {
    config.headers.Authorization = `Bearer ${getUserToken()}`
  }
  return config
})

export default axiosInstance
