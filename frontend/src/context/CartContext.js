import React, { createContext, useReducer } from 'react'
import { CartReducer, totoalSum } from './CartReducer'
import { getInStorage } from '../utils/localStorage'

export const CartContext = createContext()

// TDO: Get savedCartProducts from api
const savedCartProducts = []

const CartContextProvider = (props) => {
  const initialState = {
    cartProducts: savedCartProducts || [],
    ...totoalSum(savedCartProducts)
  }
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = (payload) => dispatch({ type: 'ADD_PRODUCT', payload })
  const increase = (payload) => dispatch({ type: 'INCREASE', payload })
  const decrease = (payload) => dispatch({ type: 'DECREASE', payload })
  const removeProduct = (payload) => dispatch({ type: 'REMOVE_PRODUCT', payload })

  return <CartContext.Provider value={{ state, addProduct, increase, decrease, removeProduct }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
