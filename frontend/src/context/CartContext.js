import React, { useContext, createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'
import { getInStorage } from '../utils/localStorage'

export const CartContext = createContext()

const initialState = {}

const savedCartItems = localStorage.getItem('cart') ? getInStorage('cart') : []

const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = (payload) => {}

  return <CartContext.Provider value={{ addProduct }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
