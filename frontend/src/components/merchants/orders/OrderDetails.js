import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Box } from '@material-ui/core'
import { CURRENCY } from '../../../utils/config'

const useStyles = makeStyles({
  bold: { fontWeight: 'bold' },
  title: { marginBottom: '15px' },
  rightGrid: { paddingLeft: '20px' },
  leftGrid: { paddingRight: '20px', borderRight: '1px solid #a3a3a3' },
  container: { background: '#ededed', boxShadow: 'black 1px 1px 4px', padding: '20px', borderRadius: '5px', marginTop: '20px' }
})

const OrderDetials = (props) => {
  const { order } = props
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} className={classes.leftGrid}>
        <Typography variant='h6' className={classes.title}>
          Produkter
        </Typography>
        {order.products.map((product) => {
          return (
            <Box display='flex' mb={2} borderBottom='1px solid #d4d4d4' justifyContent='space-between' key={product.id}>
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
      </Grid>

      <Grid item xs={6} className={classes.rightGrid}>
        <Typography variant='h6' className={classes.title}>
          Kunden
        </Typography>
        <Typography variant='body1'>
          Namn: <b>{order.customerName}</b>
        </Typography>
        <Typography variant='body1'>
          Email: <b>{order.customerEmail}</b>
        </Typography>
        <Typography variant='body1' style={{ borderBottom: '1px solid #a3a3a3', paddingBottom: '15px' }}>
          Telefonnummer: <b>{order.customerPhone}</b>
        </Typography>

        <Typography variant='h6' className={classes.title} style={{ marginTop: '15px' }}>
          Frakt
        </Typography>
        <Typography variant='body1'>
          Frakt: <b>{order.shippingMethod}</b>
        </Typography>
        <Typography variant='body1'>
          Fraktkostnad:{' '}
          <b>
            {order.shipping} {CURRENCY}
          </b>
        </Typography>
        <Typography variant='body1' style={{ borderBottom: '1px solid #a3a3a3', paddingBottom: '15px' }}>
          Adress:{' '}
          <b>
            {order.customerStreetAddress}, {order.customerZip} {order.customerCity}
          </b>
        </Typography>

        <Typography variant='h6' className={classes.title} style={{ marginTop: '15px' }}>
          Kostnad
        </Typography>
        <Typography variant='body1'>
          Delsumma:{' '}
          <b>
            {order.subtotal} {CURRENCY}
          </b>
        </Typography>
        <Typography variant='body1'>
          Totalsumma:{' '}
          <b>
            {order.total} {CURRENCY}
          </b>
        </Typography>
        <Typography variant='body1'>
          Betalmetod: <b>{order.paymentMethod}</b>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default OrderDetials
