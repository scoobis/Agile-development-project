import { Typography } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import Layout from '../src/components/layouts/Layout'
import ProducerSignupForm from '../src/components/signup/ProducerSignupForm'
import useAuth from '../src/utils/useAuth'

function BecomeProducer () {
  const { user, isCustomer, isProducer } = useAuth()

  return (
    <>
      <Head>
        <title>Bli producent</title>
      </Head>
      <Layout>
        {!user.isAuthenticated ? (
          <ProducerSignupForm />
        ) : (
          <Typography align='center' variant='h5'>
            {isProducer
              ? 'Du är redan inloggad som producent.'
              : isCustomer && 'Logga ut för att registrera dig som producent.'}
          </Typography>
        )}
      </Layout>
    </>
  )
}

export default BecomeProducer
