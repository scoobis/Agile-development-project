import React from 'react'
import Layout from '../src/components/layouts/Layout'
import Products from '../src/components/products/Products'
import CartContextProvider from '../src/context/CartContext'

function ProductsPage() {
  return (
    <Layout>
      <CartContextProvider>
        <Products />
      </CartContextProvider>
    </Layout>
}

export default ProductsPage
