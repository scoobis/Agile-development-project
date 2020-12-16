import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { CURRENCY } from '../../utils/config'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  price: { fontWeight: 'bold' }
})

const OrderConfirmation = () => {
  const classes = useStyles()
  return (
    <Container align='center'>
      <Typography variant='h2'>Tack För Din Order</Typography>
      <CheckCircleIcon style={{ fontSize: 55, marginTop: '20px', color: 'green' }} />
      <Box mt={3} justifyContent='space-between' borderBottom='1px solid #d4d4d4' display='flex' width='300px'>
        <Typography variant='body1'>Delsumma</Typography>
        <Typography variant='body1' className={classes.price}>
          55 {CURRENCY}
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
          55 {CURRENCY}
        </Typography>
      </Box>
    </Container>
  )
}

export default OrderConfirmation
