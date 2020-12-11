import React, { useContext } from 'react'
import OrderCard from './OrderCard'
import { Grid, Container } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'

const Checkout = () => {
  const { state } = useContext(CartContext)
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          Din Information
        </Grid>
        <Grid item xs={4}>
          <OrderCard state={state} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
