import React from 'react'
import Products from '../src/components/products/Products'
import CartContextProvider from '../src/context/CartContext'

function ProductsPage() {
  return (
    <CartContextProvider>
      <Products />
    </CartContextProvider>
  )
}

export default ProductsPage
