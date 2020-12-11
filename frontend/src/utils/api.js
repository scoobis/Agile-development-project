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
  const fd = new FormData()

  fd.append('name', product.name)
  fd.append('description', product.description)
  product.images.forEach((image) => fd.append('images[]', image.file))
  fd.append('price', product.price)
  fd.append('unit', product.unit)
  fd.append('salePrice', product.salePrice)
  fd.append('inStock', product.inStock)
  product.categories.forEach((category) => fd.append('categories[]', category))
  fd.append('orgNumber', product.orgNumber)

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

export const removeProduct = ({ id, orgNumber }) => {
  return axios
    .delete(`/product/${id}`, { data: { orgNumber } })
    .then((response) => response.data)
    .catch((err) => err.response)
}

export const getCategories = () =>
  axios
    .get('/products/categories')
    .then((response) => response.data)
    .catch((err) => err.response)

export const editProduct = (product) =>
  axios
    .put(`/product/${product.id}`, product)
    .then((response) => response.data)
    .catch((err) => err.response)

export const saveToCart = (products) =>
  axios
    .post('/basket', products)
    .then((response) => response.data)
    .catch((err) => err.response)

export const getCart = (id) =>
  axios
    .get(`/basket/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response)
