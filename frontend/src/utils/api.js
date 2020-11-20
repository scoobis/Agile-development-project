import axios from './axios-wrapper'

export const saveUser = (data) => axios.get('/', data)
  .then(response => response)
  .catch(err => err.response)
