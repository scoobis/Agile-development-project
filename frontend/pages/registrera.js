import React from 'react'
import CustomerSignupForm from '../src/components/signup/CustomerSignupForm'
import useAuth from '../src/utils/useAuth'

function BecomeCustomer () {
  const { user } = useAuth()

  return !user.isAuthenticated ? (
    <CustomerSignupForm />
  ) : (
    <p>Du är redan registrerad.</p>
  )
}

export default BecomeCustomer
