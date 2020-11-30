import React from 'react'
import Products from '../src/components/products/Products'
import ProductContextProvider from '../src/context/ProductContext'

function ProductsPage() {
  return (
    <ProductContextProvider>
      <Products />
    </ProductContextProvider>
  )
}

export default ProductsPage
