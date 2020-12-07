import { saveInStorage } from '../utils/localStorage'

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return addProduct(state, action.payload)
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
      quantity: payload.amount, // TODO: Need more information?
    })
  }
  saveInStorage('cart', state)
  return {
    ...state,
    cartProducts: [...state.cartProducts],
  }
}
