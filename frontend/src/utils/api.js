import axios from './axios-wrapper'

export const signup = (data) =>
  axios
    .post('/user/register', data)
    .then((response) => response)
    .catch((err) => err.response)

export const login = (user) =>
  axios
    .post('/user/login', user)
    .then((response) => response)
    .catch((err) => err.response)

export const addProduct = (product) => {
  const fd = new window.FormData()

  fd.append('name', product.name)
  fd.append('description', product.description)
  product.images.forEach((image) => fd.append('images[]', image.file))
  fd.append('price', product.price)
  fd.append('unit', product.unit)

  if (product.salePrice) {
    fd.append('salePrice', product.salePrice)
  }

  fd.append('inStock', product.inStock)
  product.categories.forEach((category) => fd.append('categories[]', category))

  if (product.tags) {
    product.tags.forEach((tag) => fd.append('tags[]', tag))
  }

  return axios
    .post('/product', fd)
    .then((response) => response.data)
    .catch((err) => err.response)
}

export const getAllProducts = () =>
  axios
    .get('/products')
    .then((response) => response.data)
    .catch((err) => err.response)

export const getProductsByProducer = (orgNumber) =>
  axios
    .get(`/products/fromProducer/${orgNumber}`)
    .then((response) => response)
    .catch((err) => err.response)

export const getAllProductsFromCategory = (id) =>
  axios
    .get(`/products/fromCategory/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response)

export const getOneProduct = (id) =>
  axios
    .get(`/product/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response)

export const removeProduct = (id) => {
  return axios
    .delete(`/product/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response)
}

export const getCategories = () =>
  axios
    .get('/products/categories')
    .then((response) => response.data)
    .catch((err) => err.response)

export const editProduct = (product) => {
  const fd = new window.FormData()

  fd.append('name', product.name)
  fd.append('description', product.description)

  if (product.imagesToAdd.length) {
    product.imagesToAdd.forEach((image) => fd.append('images[]', image.file))
  }

  if (product.imagesToRemove.length) {
    product.imagesToRemove.forEach((name) => fd.append('imagesToRemove[]', name))
  }

  fd.append('price', product.price)
  fd.append('unit', product.unit)

  if (product.salePrice) {
    fd.append('salePrice', product.salePrice)
  }

  fd.append('inStock', product.inStock)
  product.categories.forEach((category) => fd.append('categories[]', category))

  if (product.tags) {
    product.tags.forEach((tag) => fd.append('tags[]', tag))
  } else {
    fd.append('tags[]', [])
  }

  return axios
    .put(`/product/${product.id}`, fd)
    .then((response) => response.data)
    .catch((err) => err.response)
}

export const newOrder = (order) =>
  axios
    .post('/order', order)
    .then((response) => response)
    .catch((err) => err.response)

export const searchProducts = (query) => axios.get(`/products/search/${query}`)
