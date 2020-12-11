import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles({
  orderContainer: { border: '1px solid #c7c7c7', borderRadius: '5px', padding: '30px' },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold'
  },
  bold: { fontWeight: 'bold' }
})

const OrderCard = (props) => {
  const classes = useStyles()
  const { state } = props
  return (
    <Grid className={classes.orderContainer}>
      <Box>
        <Typography variant='h5' className={classes.title}>
          Din Order
        </Typography>
      </Box>
      <Box pb={1} mb={2} borderBottom='1px solid #999' display='flex' justifyContent='space-between'>
        <Typography className={classes.bold} variant='body1'>
          Produkter
        </Typography>
        <Typography className={classes.bold} variant='body1'>
          Totalt
        </Typography>
      </Box>

      {state.cartProducts.map((product) => {
        return (
          <Box pb={1} mb={3} display='flex' justifyContent='space-between' key={product.id}>
            <Typography variant='body1'>
              {product.name} x {product.quantity}
            </Typography>
            <Typography className={classes.bold} variant='body1'>
              {product.price * product.quantity}.00 SEK
            </Typography>
          </Box>
        )
      })}
      <Box pb={1} mb={2} borderTop='1px solid #999' display='flex' justifyContent='space-between'>
        <Typography className={classes.bold} variant='body1'>
          Total
        </Typography>
        <Typography className={classes.bold} variant='body1'>
          {state.total}.00 SEK
        </Typography>
      </Box>
    </Grid>
  )
}

export default OrderCard
