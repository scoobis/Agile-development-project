import axios from './axios-wrapper'

export const saveUser = (data) => axios.post('/users', data)
  .then(response => response)
  .catch(err => err.response)

export const login = (user) => axios.post('/login', user)
  .then(response => response)
  .catch(err => err.response)
