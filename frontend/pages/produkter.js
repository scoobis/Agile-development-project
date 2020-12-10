import Head from 'next/head'
import React from 'react'
import Layout from '../src/components/layouts/Layout'
import Products from '../src/components/products/Products'

function ProductsPage () {
  return (
    <>
      <Head>
        <title>Produkter</title>
      </Head>
      <Layout>
        <Products />
      </Layout>
    </>
  )
}

export default ProductsPage
