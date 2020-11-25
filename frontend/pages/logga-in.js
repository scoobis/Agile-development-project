import React, { useEffect } from 'react'
import LoginForm from '../src/components/LoginForm'
import useAuth from '../src/utils/useAuth'
import Router from 'next/router'

function Login () {
  const { isProducer, isCustomer, user } = useAuth()

  useEffect(() => {
    if (isProducer) {
      Router.push('/merchants')
    } else if (isCustomer) {
      Router.push('/produkter')
    }
  }, [isProducer, isCustomer])

  return !user.isAuthenticated ? (
    <LoginForm />
  ) : (
    <p>Du är redan inloggad.</p>
  )
}

export default Login
