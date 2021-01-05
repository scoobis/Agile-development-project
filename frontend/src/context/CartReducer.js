import { saveInStorage, removeInStorage } from '../utils/localStorage'

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return addProduct(state, action.payload)
    case 'INCREASE':
      return increase(state, action.payload)
    case 'DECREASE':
      return decrease(state, action.payload)
    case 'REMOVE_PRODUCT':
      return removeProduct(state, action.payload)
    case 'CLEAR_CART':
      return clearCart()
    case 'SET_PAID':
      return setPaid(state)
    default:
      return { ...state }
  }
}

const setPaid = (state) => {
  return { ...state, isPaid: true }
}

const clearCart = () => {
  removeInStorage('cart')
  return { cartProducts: [] }
}

const addProduct = (state, payload) => {
  const exists = state.cartProducts.find((product) => product.id === payload.id)
  if (exists) {
    const addedIndex = state.cartProducts.findIndex((product) => product.id === payload.id)

    if (payload.inStock >= payload.amount + state.cartProducts[addedIndex].quantity) {
      state.cartProducts[addedIndex].quantity += payload.amount
    }
  } else {
    state.cartProducts.push({
      id: payload.id,
      quantity: payload.amount,
      name: payload.name,
      price: payload.price,
      unit: payload.unit,
      orgNumber: payload.orgNumber,
      image: payload.image
    })
  }
  saveInStorage('cart', state.cartProducts)
  return { ...state, cartProducts: [...state.cartProducts], ...totalSum(state.cartProducts) }
}

const increase = (state, payload) => {
  const increaseIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts[increaseIndex].quantity++
  saveInStorage('cart', state.cartProducts)
  return { ...state, cartProducts: [...state.cartProducts], ...totalSum(state.cartProducts) }
}

const decrease = (state, payload) => {
  const decreaseIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts[decreaseIndex].quantity--
  saveInStorage('cart', state.cartProducts)
  return { ...state, cartProducts: [...state.cartProducts], ...totalSum(state.cartProducts) }
}

const removeProduct = (state, payload) => {
  const removeIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts.splice(removeIndex, 1)
  saveInStorage('cart', state.cartProducts)
  return { ...state, cartProducts: [...state.cartProducts], ...totalSum(state.cartProducts) }
}

export const totalSum = (cartProducts) => {
  const total = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0
  return { total }
}
