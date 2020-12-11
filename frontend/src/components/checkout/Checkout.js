import React from 'react'
import OrderCard from './OrderCard'
import { Grid, Container } from '@material-ui/core'

const Checkout = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <OrderCard />
      </Grid>
    </Container>
  )
}

export default Checkout
