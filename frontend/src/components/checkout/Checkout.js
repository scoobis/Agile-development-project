import React, { useContext } from 'react'
import OrderCard from './OrderCard'
import { Grid, Container, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import CheckoutForm from './CheckoutForm'

const Checkout = () => {
  const { state, setPaid } = useContext(CartContext)

  const handleChange = () => {}
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CheckoutForm cartContext={state} />
        </Grid>
        <Grid item xs={4}>
          <OrderCard state={state} setPaid={setPaid} />
          <FormControl fullWidth component='fieldset' style={{ marginTop: '30px', borderRadius: '5px', background: '#e3e3e3', padding: '30px' }}>
            <Typography variant='h5' style={{ marginBottom: '10px' }}>
              Betalalternativ
            </Typography>
            <RadioGroup aria-label='paymentOptions' name='paymentOptions' value={'place'} onChange={handleChange}>
              <FormControlLabel
                style={{ borderBottom: '1px solid #999' }}
                value='place'
                control={<Radio style={{ color: 'black' }} />}
                label='Betala på plats'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
