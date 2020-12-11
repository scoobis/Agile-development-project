import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'

import dynamic from 'next/dynamic'
const Cart = dynamic(() => import('../src/components/cart/cart'), {
  ssr: false
})

const CartPage = () => {
  return (
    <>
      <Head>
        <title>Varukorg</title>
      </Head>
      <Layout>
        <Cart />
      </Layout>
    </>
  )
}

export default CartPage
