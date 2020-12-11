import React, { createContext, useEffect, useReducer, useState, up } from 'react'
import { CartReducer, totoalSum, updateState } from './CartReducer'
import { getInStorage, saveInStorage } from '../utils/localStorage'
import { v4 as uuidv4 } from 'uuid'
import { getCart } from '../utils/api'

export const CartContext = createContext()

const CartContextProvider = (props) => {
  let cartId = ''
  if (process.browser && localStorage.getItem('cartId')) cartId = getInStorage('cartId')
  else if (process.browser) {
    cartId = uuidv4()
    saveInStorage('cartId', cartId)
  }

  const [savedCartProducts, setSavedCartProducts] = useState({
    cartProducts: [],
    totoal: 0,
    id: cartId
  })

  useEffect(() => {
    getCart(cartId).then((response) => {
      setSavedCartProducts(response)
      updateState(response)
    })
  }, [])

  const [state, dispatch] = useReducer(CartReducer, savedCartProducts)

  // Sets intitial value
  const updateState = (payload) => dispatch({ type: 'UPDATE', payload })

  const addProduct = (payload) => dispatch({ type: 'ADD_PRODUCT', payload })
  const increase = (payload) => dispatch({ type: 'INCREASE', payload })
  const decrease = (payload) => dispatch({ type: 'DECREASE', payload })
  const removeProduct = (payload) => dispatch({ type: 'REMOVE_PRODUCT', payload })

  return <CartContext.Provider value={{ state, addProduct, increase, decrease, removeProduct }}>{props.children}</CartContext.Provider>
}

export default CartContextProvider
