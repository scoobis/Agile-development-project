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
  const token = getUserToken()
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export default axiosInstance
