import React, { useContext, createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'
import { getInStorage } from '../utils/localStorage'

export const CartContext = createContext()

//const savedCartProducts = localStorage.getItem('cart') ? getInStorage('cart') : []
const savedCartProducts = []

const initialState = {
  cartProducts: savedCartProducts,
}

const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = (payload) => dispatch({ type: 'ADD_PRODUCT', payload })

  return <CartContext.Provider value={{ addProduct }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
