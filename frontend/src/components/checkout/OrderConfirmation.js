import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const OrderConfirmation = () => {
  return (
    <Container align='center'>
      <Typography variant='h2'>Tack För Din Order</Typography>
      <CheckCircleIcon style={{ fontSize: 55, marginTop: '20px', color: 'green' }} />
      <Box></Box>
    </Container>
  )
}

export default OrderConfirmation
