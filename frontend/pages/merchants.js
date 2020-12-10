import React from 'react'
import Layout from '../src/components/layouts/Layout'
import ProducerDashboard from '../src/components/merchants/ProducerDashboard'
import withProducer from '../src/components/hocs/withProducer'
import useAuth from '../src/utils/useAuth'
import Head from 'next/head'

function Merchants () {
  const { isProducer } = useAuth()

  return (
    isProducer && (
      <>
        <Head>
          <title>Producenter</title>
        </Head>
        <Layout>
          <ProducerDashboard />
        </Layout>
      </>
    )
  )
}

export default withProducer(Merchants)
