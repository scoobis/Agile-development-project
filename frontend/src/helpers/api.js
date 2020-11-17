import axios from './axios-wrapper'

export const saveUser = (data) =>
  axios.post('/users', data).then(result => result.data || result.error)
