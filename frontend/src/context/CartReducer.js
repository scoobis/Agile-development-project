import { saveInStorage } from '../utils/localStorage'

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return addProduct(state, action.payload)
    case 'INCREASE':
      return increase(state, action.payload)
    case 'DECREASE':
      decrease(state, action.payload)
    default:
      return { ...state }
  }
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
      price: payload.price,
    })
  }
  saveInStorage('cart', state.cartProducts)
  return { ...state, cartProducts: [...state.cartProducts] }
}

const increase = (state, payload) => {
  const increaseIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts[increaseIndex].quantity++
  saveInStorage('cart', state.cartProducts)
  return {
    ...state,
    cartItems: [...state.cartProducts],
  }
}

const decrease = (state, payload) => {
  const decreaseIndex = state.cartProducts.findIndex((product) => product.id === payload.id)
  state.cartProducts[decreaseIndex].quantity--
  saveInStorage('cart', state.cartProducts)
  return {
    ...state,
    cartItems: [...state.cartProducts],
  }
}
