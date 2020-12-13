import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Box } from '@material-ui/core'
import { CURRENCY } from '../../utils/config'

const useStyles = makeStyles({
  orderContainer: { borderRadius: '5px', padding: '30px', background: '#e3e3e3' },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold'
  },
  bold: { fontWeight: 'bold' }
})

const OrderCard = (props) => {
  const classes = useStyles()
  const { state } = props
  const { total, cartProducts } = state
  return (
    <Grid className={classes.orderContainer}>
      <Box borderBottom='1px solid #999'>
        <Typography variant='h5' className={classes.title}>
          Din order
        </Typography>
      </Box>

      {cartProducts.map((product) => {
        return (
          <Box
            pb={1}
            mt={2}
            mb={2}
            display='flex'
            borderBottom='1px solid #d4d4d4'
            justifyContent='space-between'
            key={product.id}
          >
            <img src='/apples.jpg' style={{ width: '40px' }} />
            <Typography variant='body1'>
              {product.name} <b>x {product.quantity}</b>
            </Typography>
            <Typography className={classes.bold} variant='body1'>
              {product.price * product.quantity} {CURRENCY}
            </Typography>
          </Box>
        )
      })}
      <Box pb={1} mb={2} mt={5} borderBottom='1px solid #999' display='flex' justifyContent='space-between'>
        <Typography variant='body1'>Delsumma</Typography>
        <Typography className={classes.bold} variant='body1'>
          {total} {CURRENCY}
        </Typography>
      </Box>
      <Box pb={1} mb={2} mt={3} borderBottom='1px solid #999' display='flex' justifyContent='space-between'>
        <Typography variant='body1'>Frakt</Typography>
        <Typography className={classes.bold} variant='body1'>
          Hämtas på plats
        </Typography>
      </Box>
      <Box pt={4} pb={4} display='flex' justifyContent='space-between'>
        <Typography variant='body1'>Totalsumma</Typography>
        <Typography className={classes.bold} variant='h4'>
          {total} {CURRENCY}
        </Typography>
      </Box>
    </Grid>
  )
}

export default OrderCard
