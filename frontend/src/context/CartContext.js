import React, { createContext, useReducer } from 'react'
import { CartReducer, totalSum } from './CartReducer'
import { isInStorage, getInStorage } from '../utils/localStorage'

export const CartContext = createContext()

const CartContextProvider = (props) => {
  const itemsInCart = isInStorage('cart') ? getInStorage('cart') : []

  const initialState = {
    cartProducts: itemsInCart,
    ...totalSum(itemsInCart)
  }

  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = (payload) => dispatch({ type: 'ADD_PRODUCT', payload })
  const increase = (payload) => dispatch({ type: 'INCREASE', payload })
  const decrease = (payload) => dispatch({ type: 'DECREASE', payload })
  const removeProduct = (payload) => dispatch({ type: 'REMOVE_PRODUCT', payload })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return <CartContext.Provider value={{ state, addProduct, increase, decrease, removeProduct, clearCart }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
