import { Typography } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import Layout from '../src/components/layouts/Layout'
import CustomerSignupForm from '../src/components/signup/CustomerSignupForm'
import useAuth from '../src/utils/useAuth'

function BecomeCustomer () {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>Registrera</title>
      </Head>
      <Layout>
        {!user.isAuthenticated ? (
          <CustomerSignupForm />
        ) : (
          <Typography align='center' variant='h5'>
            Du är redan registrerad och inloggad.
          </Typography>
        )}
      </Layout>
    </>
  )
}

export default BecomeCustomer
