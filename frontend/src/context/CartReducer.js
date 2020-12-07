const addProduct = (state, payload) => {
  const exists = state.cartProducts.find((product) => product.id === payload.id)
  if (exists) {
    // incrment amount
  } else {
    state.cartProducts.push({
      id: payload.id,
      amount: payload.amount,
    })
  }
  return {
    ...state,
    cartProducts: [...state.cartProducts],
  }
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return addProduct(state, action.payload)
    default:
      return { ...state }
  }
}
