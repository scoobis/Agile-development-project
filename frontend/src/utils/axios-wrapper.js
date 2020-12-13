import axios from 'axios'
import { getUserToken } from './auth-cookies'
import { API_URL } from './config'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ' + process.browser && getUserToken()
  }
})

export default axiosInstance
