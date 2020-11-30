import React, { createContext, useState, useEffect } from 'react'
import { getOneProduct } from '../utils/api'

export const SpecificProductContext = createContext()

const SpecificProductContext = () => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    getOneProduct(1).then((response) => {
      setProduct([response])
    })
  }, [])

  return <SpecificProductContext.Provider value={{ products }}>{props.children}</SpecificProductContext.Provider>
}

export default SpecificProductContext
