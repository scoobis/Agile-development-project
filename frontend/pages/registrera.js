import { Typography } from '@material-ui/core'
import React from 'react'
import CustomerSignupForm from '../src/components/signup/CustomerSignupForm'
import useAuth from '../src/utils/useAuth'

function BecomeCustomer () {
  const { user } = useAuth()

  return !user.isAuthenticated ? (
    <CustomerSignupForm />
  ) : (
    <Typography align='center' variant='h5'>
      Du är redan registrerad och inloggad.
    </Typography>
  )
}

export default BecomeCustomer
