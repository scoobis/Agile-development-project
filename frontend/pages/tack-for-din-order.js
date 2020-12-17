import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'
import { withRouter } from 'next/router'

import dynamic from 'next/dynamic'
const OrderConfirmation = dynamic(() => import('../src/components/checkout/OrderConfirmation'), {
  ssr: false
})

const CheckoutPage = ({ router }) => {
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

export default withRouter(CheckoutPage)
