import axios from 'axios'

const BASE_URL = 'http://localhost:5001'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json'
  }
})

export const setAuthToken = (token) => {
  axios.defaults.headers.common.Authorization = ''
  delete axios.defaults.headers.common.Authorization

  if (token) {
    axios.defaults.headers.common.Authorization = `${token}`
  }
}

export default axiosInstance
