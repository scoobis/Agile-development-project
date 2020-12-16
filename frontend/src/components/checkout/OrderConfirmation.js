import React, { useContext } from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { CURRENCY } from '../../utils/config'
import { makeStyles } from '@material-ui/core/styles'
import { CartContext } from '../../context/CartContext'
import AccordionGroup from '../AccordionGroup'

const useStyles = makeStyles({
  price: { fontWeight: 'bold' }
})

const OrderConfirmation = () => {
  const { state } = useContext(CartContext)

  const classes = useStyles()
  // TODO: Shipping and payment is hardcoded (Only option atm)
  return (
    <Container align='center'>
      <Typography variant='h2'>Tack För Din Order</Typography>
      <CheckCircleIcon style={{ fontSize: 55, marginTop: '20px', color: 'green' }} />

      <Box mt={3} width='320px'>
        <AccordionGroup
          items={[
            {
              heading: 'Om producenten',
              content: (
                <Grid container align='left'>
                  <Grid container style={{ borderBottom: '1px solid #d4d4d4', marginBottom: '15px', paddingBottom: '10px' }}>
                    <Grid item xs={4}>
                      <img src='/apples.jpg' style={{ width: '90px' }} />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='subtitle1'>
                        Title <b>x 5</b>
                      </Typography>
                      <Typography>
                        Pris: <b>45 SEK</b>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container style={{ borderBottom: '1px solid #d4d4d4', marginBottom: '15px', paddingBottom: '10px' }}>
                    <Grid item xs={4}>
                      <img src='/apples.jpg' style={{ width: '90px' }} />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='subtitle1'>
                        Title <b>x 5</b>
                      </Typography>
                      <Typography>
                        Pris: <b>45 SEK</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
          ]}
        />
      </Box>

      <Box mt={3} justifyContent='space-between' borderBottom='1px solid #d4d4d4' display='flex' width='300px'>
        <Typography variant='body1'>Delsumma</Typography>
        <Typography variant='body1' className={classes.price}>
          {state.total} {CURRENCY}
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
          {state.total} {CURRENCY}
        </Typography>
      </Box>
    </Container>
  )
}

export default OrderConfirmation
