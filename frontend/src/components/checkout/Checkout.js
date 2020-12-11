import React from 'react'
import OrderCard from './OrderCard'
import { Grid, Container } from '@material-ui/core'

const Checkout = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          Din Information
        </Grid>
        <Grid item xs={4}>
          <OrderCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
