import React, { createContext, useState } from 'react'

export const ProductContext = createContext()

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([
    { title: 'Äpple', description: 'Just a description', price: '70', stock: 50, imgSrc: 'apples.jpg', id: 1 },
    { title: 'Äpple', description: 'Just a description', price: '70', stock: 65, imgSrc: 'apples.jpg', id: 2 },
    { title: 'Äpple', description: 'Just a description', price: '70', stock: 65, imgSrc: 'apples.jpg', id: 3 },
    { title: 'Äpple', description: 'Just a description', price: '70', stock: 65, imgSrc: 'apples.jpg', id: 4 },
  ])

  return <ProductContext.Provider value={{ products }}>{props.children}</ProductContext.Provider>
}

export default ProductContextProvider
