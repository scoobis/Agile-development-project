import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles({
  orderContainer: { border: '1px solid grey', padding: '30px' },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold'
  }
})

const OrderCard = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.orderContainer}>
      <Box>
        <Typography variant='h4' className={classes.title}>
          Din Order
        </Typography>
      </Box>
    </Grid>
  )
}

export default OrderCard
