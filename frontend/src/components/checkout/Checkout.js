import React, { useContext } from 'react'
import OrderCard from './OrderCard'
import { Grid, Container, Typography, FormControl, Box, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import CheckoutForm from './CheckoutForm'
import { PRODUCTS_PATH } from '../../utils/config'
import Link from 'next/link'

const Checkout = () => {
  const { state, setPaid } = useContext(CartContext)

  const handleChange = () => {}
  return (
    <Container>
      {state.cartProducts.length ? (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CheckoutForm cartContext={state} setPaid={setPaid} />
          </Grid>
          <Grid item xs={4}>
            <OrderCard state={state} />
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
      ) : (
        <Grid item xs={12}>
          <Box textAlign='center'>
            <Box pb={1}>
              <Typography>Din varukorg är tom</Typography>
            </Box>
            <Button variant='contained' color='primary'>
              <Link href={PRODUCTS_PATH}>
                <a style={{ color: '#fff' }}>Börja handla</a>
              </Link>
            </Button>
          </Box>
        </Grid>
      )}
    </Container>
  )
}

export default Checkout
