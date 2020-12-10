import Head from 'next/head'
import Cart from '../src/components/cart/cart'
import Layout from '../src/components/layouts/Layout'

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
