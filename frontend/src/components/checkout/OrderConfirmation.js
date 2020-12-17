import React, { useContext, useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Button } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { CURRENCY } from '../../utils/config'
import { makeStyles } from '@material-ui/core/styles'
import { CartContext } from '../../context/CartContext'
import AccordionGroup from '../AccordionGroup'
import Link from 'next/link'
import { PRODUCTS_PATH } from '../../utils/config'

const useStyles = makeStyles({
  price: { fontWeight: 'bold' }
})

const OrderConfirmation = () => {
  const { state, clearCart } = useContext(CartContext)

  const [stateCopy, setStateCopy] = useState(state)
  const [isPaid] = useState(state.isPaid)

  useEffect(() => {
    if (state.isPaid) clearCart()
  }, [])

  const classes = useStyles()
  // TODO: Shipping and payment is hardcoded (Only option atm)
  return (
    <Container align='center'>
      {isPaid ? (
        <>
          <Typography variant='h2'>Tack För Din Order</Typography>
          <CheckCircleIcon style={{ fontSize: 55, marginTop: '20px', color: 'green' }} />

          <Box mt={3} width='320px'>
            <AccordionGroup
              items={[
                {
                  heading: 'Produkter',
                  content: (
                    <Grid container align='left'>
                      {stateCopy.cartProducts.map((product) => {
                        return (
                          <Grid container style={{ borderBottom: '1px solid #d4d4d4', marginBottom: '15px', paddingBottom: '10px' }} key={product.id}>
                            <Grid item xs={4}>
                              <img src='/apples.jpg' style={{ width: '90px' }} />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant='subtitle1'>
                                {product.name}{' '}
                                <i>
                                  {product.quantity} {product.unit}
                                </i>
                              </Typography>
                              <Typography>
                                Pris: <b>{product.price * product.quantity} SEK</b>
                              </Typography>
                            </Grid>
                          </Grid>
                        )
                      })}
                    </Grid>
                  )
                }
              ]}
            />
          </Box>

          <Box mt={3} justifyContent='space-between' borderBottom='1px solid #d4d4d4' display='flex' width='300px'>
            <Typography variant='body1'>Delsumma</Typography>
            <Typography variant='body1' className={classes.price}>
              {stateCopy.total} {CURRENCY}
            </Typography>
          </Box>

          <Box mt={3} justifyContent='space-between' borderBottom='1px solid #d4d4d4' display='flex' width='300px'>
            <Typography variant='body1'>Frakt</Typography>
            <Typography variant='body1' className={classes.price}>
              0 {CURRENCY}
            </Typography>
          </Box>

          <Box mt={3} justifyContent='space-between' borderBottom='1px solid #d4d4d4' display='flex' width='300px'>
            <Typography variant='body1'>Betalas</Typography>
            <Typography variant='body1' className={classes.price}>
              På plats
            </Typography>
          </Box>

          <Box mt={3} justifyContent='space-between' borderBottom='1px solid #d4d4d4' display='flex' width='300px'>
            <Typography variant='subtitle1'>Totalsumma</Typography>
            <Typography variant='subtitle1' className={classes.price}>
              {stateCopy.total} {CURRENCY}
            </Typography>
          </Box>
          <Link href='/produkter'>
            <a style={{ color: '#fff', textDecoration: 'none' }}>
              <Button style={{ marginTop: '30px' }} variant='contained' color='primary'>
                Fortsätt handla
              </Button>
            </a>
          </Link>
        </>
      ) : (
        <Grid item xs={12}>
          <Box textAlign='center'>
            <Box pb={1}>
              <Typography>Du kan inte besöka denna sidan utan ett genomföra en order</Typography>
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

export default OrderConfirmation
