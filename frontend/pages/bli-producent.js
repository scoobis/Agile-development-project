import { Typography } from '@material-ui/core'
import React from 'react'
import ProducerSignupForm from '../src/components/signup/ProducerSignupForm'
import useAuth from '../src/utils/useAuth'

function BecomeProducer () {
  const { user, isCustomer, isProducer } = useAuth()

  return (
    !user.isAuthenticated ? (
      <ProducerSignupForm />
    ) : (
      <Typography align='center' variant='h5'>
        {isProducer ? (
          'Du är redan inloggad som producent.'
        ) : isCustomer && (
          'Logga ut för att registrera dig som producent.'
        )}
      </Typography>
    )
  )
}

export default BecomeProducer
