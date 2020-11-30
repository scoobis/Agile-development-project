import React, { createContext, useState, useEffect } from 'react'
import { getAllProducts } from '../utils/api'

export const ProductContext = createContext()

const ProductContextProvider = (props) => {
  // Get data from the api instead
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts([...products, ...response])
    })
  }, [])

  return <ProductContext.Provider value={{ products }}>{props.children}</ProductContext.Provider>
}

export default ProductContextProvider
