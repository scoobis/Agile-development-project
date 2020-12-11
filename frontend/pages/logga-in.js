import React, { useEffect } from 'react'
import Layout from '../src/components/layouts/Layout'
import LoginForm from '../src/components/LoginForm'
import useAuth from '../src/utils/useAuth'
import { useRouter } from 'next/router'
import Head from 'next/head'

function Login () {
  const { isProducer, isCustomer, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isProducer) {
      router.push('/merchants')
    } else if (isCustomer) {
      router.push('/produkter')
    }
  }, [isProducer, isCustomer])

  return (
    <>
      <Head>
        <title>Logga in</title>
      </Head>
      <Layout>{!user.isAuthenticated && <LoginForm />}</Layout>
    </>
  )
}

export default Login
