export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      console.log(state)
      const exists = state.cartProducts.find((product) => product.id === action.payload.id)
      if (exists) {
        // incrment amount
      } else {
        state.cartProducts.push({
          id: action.payload.id,
          amount: action.payload.amount,
        })
      }
      return {
        ...state,
        cartProducts: [...state.cartProducts],
      }
    default:
      return { ...state }
  }
}
