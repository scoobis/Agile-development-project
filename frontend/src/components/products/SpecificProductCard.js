import React, { useContext, useState } from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'

import { makeStyles } from '@material-ui/core/styles'
import PickAmount from './PickAmount'

const SpecificProductCard = (props) => {
  const useStyles = makeStyles({
    root: { backgroundColor: 'white' },
    center: { textAlign: 'center' },
    bold: { fontWeight: 'bold' },
  })

  const [amount, setAmount] = useState(1)

  const { name, price, unit, inStock, id } = props

  const { addProduct } = useContext(CartContext)

  const classes = useStyles()

  const handleAmountChange = (value) => setAmount(value)

  return (
    <Card className={classes.root}>
      <CardContent className={classes.center}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h3'>{name}</Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography variant='body1'>Some short deescription?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.bold} variant='h4'>
              {price} SEK/{unit}
            </Typography>
            <br />
            <br />
          </Grid>
          <Grid item xs={12}>
            <PickAmount inStock={inStock} handleAmountChange={handleAmountChange} />
          </Grid>
          <Grid item xs={12}>
            <Button size='large' fullWidth variant='contained' color='primary' onClick={() => addProduct({ id, amount })}>
              Lägg i kundvagn
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='caption'>I lager: {inStock}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SpecificProductCard
