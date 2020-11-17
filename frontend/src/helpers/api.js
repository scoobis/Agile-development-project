import axios from './axios-wrapper'

export const isAlreadyRegistered = (email) =>
  axios.get(`/users?email=${email}`).then(result => !!result.data)

export const saveUser = (data) =>
  axios.post('/users', data).then(result => result.data || result.error)
