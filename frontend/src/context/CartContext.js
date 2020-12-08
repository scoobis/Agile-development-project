import React, { useContext, createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'
import { getInStorage } from '../utils/localStorage'

export const CartContext = createContext()

let savedCartProducts
if (typeof window !== 'undefined') savedCartProducts = window.localStorage.getItem('cart') ? getInStorage('cart') : []

console.log('SAVE', savedCartProducts)
const initialState = {
  cartProducts: savedCartProducts || [],
}

const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = (payload) => dispatch({ type: 'ADD_PRODUCT', payload })
  const increase = (payload) => dispatch({ type: 'INCREASE', payload })
  const decrease = (payload) => dispatch({ type: 'DECREASE', payload })
  const removeProduct = (payload) => dispatch({ type: 'REMOVE_PRODUCT', payload })

  console.log('CONTEXT', state.cartProducts)

  return <CartContext.Provider value={{ addProduct, increase, decrease, state, removeProduct }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
