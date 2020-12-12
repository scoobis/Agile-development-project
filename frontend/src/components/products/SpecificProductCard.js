import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button, Grid, Box } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import PickAmount from './PickAmount'
import { useSnackbar } from 'notistack'
import { isNull } from '../../utils/helpers'

const SpecificProductCard = (props) => {
  const useStyles = makeStyles({
    root: { backgroundColor: 'white' },
    center: { textAlign: 'center' },
    bold: { fontWeight: 'bold' },
    oldPrice: { textDecoration: 'line-through', fontSize: 16 },
    salePrice: { color: 'red' }
  })

  const { name, price, salePrice, unit, inStock, id, description } = props
  const [amount, setAmount] = useState(1)
  const { addProduct } = useContext(CartContext)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleAmountChange = (value) => setAmount(value)

  const handleAddToCart = () => {
    addProduct({ id, amount, name, price })

    enqueueSnackbar(`${name} har lagts till i varukorgen`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    })
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.center}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h3'>{name}</Typography>
          </Grid>
          {!isNull(description) && (
            <Grid xs={12} item>
              <Typography variant='body1'>{description}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography className={`${classes.bold} ${salePrice && classes.oldPrice}`} variant='h4'>
              {price} SEK/{unit}
            </Typography>
            {salePrice && (
              <Typography className={` ${classes.bold} ${classes.salePrice} `} variant='h4'>
                {salePrice} SEK/{unit}
              </Typography>
            )}
            <br />
            <br />
          </Grid>
          <Grid item xs={12}>
            <PickAmount inStock={inStock} handleAmountChange={handleAmountChange} />
          </Grid>
          <Grid item xs={12}>
            <Button size='large' fullWidth variant='contained' color='primary' onClick={handleAddToCart}>
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
