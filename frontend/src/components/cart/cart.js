import React from 'react'
import SummaryCard from './SummaryCard'
import { Container, Grid } from '@material-ui/core'

const Cart = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          Products
        </Grid>
        <Grid item xs={4}>
          <SummaryCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
