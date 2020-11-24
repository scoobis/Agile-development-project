import axios from './axios-wrapper'

export const signup = (data) => axios.post('/signup', data)
  .then(response => response)
  .catch(err => err.response)

export const login = (user) => axios.post('/login', user)
  .then(response => response)
  .catch(err => err.response)
