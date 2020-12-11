import { saveToCart } from '../utils/api'

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return addProduct(state, action.payload)
    case 'UPDATE':
      return updateState(state, action.payload)
    case 'INCREASE':
      return increase(state, action.payload)
    case 'DECREASE':
      return decrease(state, action.payload)
    case 'REMOVE_PRODUCT':
      return removeProduct(state, action.payload)
    default:
      return { ...state }
  }
}

export const updateState = (state, payload) => {
  return { cartProducts: payload.cartProducts, ...totoalSum(payload.cartProducts), id: state.id }
}

const addProduct = (state, payload) => {
  const exists = state.cartProducts.find((product) => product.id === payload.id)
  if (exists) {
    const addedIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
    state.cartProducts[addedIndex].quantity += payload.amount
  } else {
    state.cartProducts.push({
      id: payload.id,
      quantity: payload.amount,
      name: payload.name,
      price: payload.price
    })
  }
  saveToCart(state)
  return { ...state, cartProducts: [...state.cartProducts], ...totoalSum(state.cartProducts) }
}

const increase = (state, payload) => {
  const increaseIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts[increaseIndex].quantity++
  saveToCart(state)
  return { ...state, cartProducts: [...state.cartProducts], ...totoalSum(state.cartProducts) }
}

const decrease = (state, payload) => {
  const decreaseIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts[decreaseIndex].quantity--
  saveToCart(state)
  return { ...state, cartProducts: [...state.cartProducts], ...totoalSum(state.cartProducts) }
}

const removeProduct = (state, payload) => {
  const removeIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts.splice(removeIndex, 1)
  saveToCart(state)
  return { ...state, cartProducts: [...state.cartProducts], ...totoalSum(state.cartProducts) }
}

const totoalSum = (cartProducts) => {
  let total
  cartProducts ? (total = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)) : 0
  return { total }
}
