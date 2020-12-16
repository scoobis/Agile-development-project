import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'

import dynamic from 'next/dynamic'
const OrderConfirmation = dynamic(() => import('../src/components/checkout/OrderConfirmation'), {
  ssr: false
})

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <title>Tack För Din Order</title>
      </Head>
      <Layout>
        <OrderConfirmation />
      </Layout>
    </>
  )
}

export default CheckoutPage
