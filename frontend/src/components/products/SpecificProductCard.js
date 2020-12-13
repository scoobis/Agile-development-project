import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button, Grid, Box } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import PickAmount from './PickAmount'
import { useSnackbar } from 'notistack'
import Link from 'next/link'
import AccordionGroup from '../AccordionGroup'
import { isNull } from '../../utils/helpers'

const SpecificProductCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: { backgroundColor: theme.palette.common.white },
    center: { textAlign: 'center' },
    bold: { fontWeight: 'bold' },
    oldPrice: { textDecoration: 'line-through', fontSize: 16 },
    salePrice: { color: 'red', marginRight: '15px' },
    cardContent: { padding: '15px 30px' },
    lowInStock: { color: '#ffa700' },
    highInStock: { color: 'green' },
    outOfStock: { color: 'red' }
  }))

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

  const getStockColor = () => {
    if (inStock === 0) {
      return classes.outOfStock
    } else if (inStock <= 2) {
      return classes.lowInStock
    }

    return classes.highInStock
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <Typography variant='h3'>{name}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography align='right' variant='h6'>
              <Link href='#'>
                <a style={{ textDecoration: 'none', color: 'inherit' }}>Lenas Gårdsbutik</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {salePrice && (
              <Typography display='inline' className={` ${classes.bold} ${classes.salePrice} `} variant='h5'>
                {salePrice} SEK/{unit}
              </Typography>
            )}
            <Typography display='inline' className={`${classes.bold} ${salePrice && classes.oldPrice}`} variant='h5'>
              {price} SEK/{unit}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={getStockColor()}>{inStock} i lager</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' pb={3} pt={3}>
              <PickAmount inStock={inStock} handleAmountChange={handleAmountChange} />
              <Button
                disabled={inStock === 0}
                size='large'
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleAddToCart}
              >
                {inStock === 0 ? 'Slut i lager' : 'Lägg i kundvagn'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <AccordionGroup
              items={[
                {
                  heading: 'Beskrivning',
                  content: !isNull(description) ? description : ''
                },
                {
                  heading: 'Om producenten',
                  content: 'Hello world!'
                }
              ]}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SpecificProductCard
