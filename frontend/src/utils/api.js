import axios from './axios-wrapper'

export const signup = (data) => axios.post('/user/register', data)
  .then(response => response)
  .catch(err => err.response)

export const login = (user) => axios.post('/user/login', user)
  .then(response => response)
  .catch(err => err.response)
