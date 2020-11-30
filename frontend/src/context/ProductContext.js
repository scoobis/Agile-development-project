import React, { createContext, useState, useEffect } from 'react'
import { getAllProducts } from '../utils/api'

export const ProductContext = createContext()

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts([...response])
    })
  }, [])

  return <ProductContext.Provider value={{ products }}>{props.children}</ProductContext.Provider>
}

export default ProductContextProvider
