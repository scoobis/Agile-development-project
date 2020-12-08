import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { CartReducer } from './CartReducer'
import { getInStorage } from '../utils/localStorage'

export const CartContext = createContext()

let savedCartProducts
if (typeof window !== 'undefined') savedCartProducts = window.localStorage.getItem('cart') ? getInStorage('cart') : []

console.log(savedCartProducts)
const initialState = {
  cartProducts: savedCartProducts || [],
}

const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = (payload) => dispatch({ type: 'ADD_PRODUCT', payload })
  const increase = (payload) => dispatch({ type: 'INCREASE', payload })

  return <CartContext.Provider value={{ addProduct, increase, state }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
