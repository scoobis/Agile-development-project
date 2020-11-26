import axios, { setAuthToken } from './axios-wrapper'

export const signup = (data) => axios.post('/user/register', data)
  .then(response => response)
  .catch(err => err.response)

export const login = (user) => axios.post('/user/login', user)
  .then(response => {
    if (response.status === 200) {
      setAuthToken(response.data.token)
    }

    return response
  })
  .catch(err => err.response)

export const addProduct = product => axios.post('/product', product)
  .then(response => response.data)
  .catch(err => err.response)
