import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'

import dynamic from 'next/dynamic'
const Checkout = dynamic(() => import('../src/components/checkout/Checkout'), {
  ssr: false
})

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <title>Kassa</title>
      </Head>
      <Layout>
        <Checkout />
      </Layout>
    </>
  )
}

export default CheckoutPage
