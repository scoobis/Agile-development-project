import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import Link from 'next/link'
import PickAmount from './PickAmount'
import { PRODUCTS_PATH } from '../../utils/config'
import { itemsInCartAreFromSameProducer } from '../../utils/helpers'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    cursor: 'pointer',
    '&:hover': {
      border: 4,
      boxShadow: '0 2px 2px 2px rgb(0,0,0,0.2)'
    }
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  img: {
    width: '260px',
    margin: 'auto',
    display: 'block'
  },
  a: {
    color: 'black',
    textDecoration: 'none'
  },
  media: {
    height: 200
  },
  green: { color: 'green' },
  yellow: { color: '#dee600' }
})

const ProductCard = (props) => {
  const { id, name, price, unit, inStock, imgSrc, orgNumber, category } = props
  const { addProduct, state } = useContext(CartContext)
  const [amount, setAmount] = useState(1)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleAddProduct = () => {
    const canAdd = itemsInCartAreFromSameProducer(state.cartProducts, orgNumber)

    if (canAdd) {
      addProduct({ id, amount, name, price, unit, orgNumber, inStock })

      enqueueSnackbar(`${name} har lagts till i varukorgen`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      })
    } else {
      enqueueSnackbar('Du kan endast handla från en producent per köp', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      })
    }
  }

  const handleAmountChange = (value) => setAmount(value)

  return (
    <Card className={classes.root}>
      <Link href={`${PRODUCTS_PATH}/${id}`}>
        <a className={classes.a}>
          <CardMedia className={classes.media} image={imgSrc} title='Produkt bild' />
          <CardContent>
            <Typography variant='h4' component='h2'>
              {name}
            </Typography>
            <Typography color='textSecondary'>{category}</Typography>
            <Typography className={(classes.pos, inStock <= 10 ? classes.yellow : classes.green)} color='textSecondary'>
              {inStock} i lager
            </Typography>
            <Typography variant='h5'>
              {price} kr / {unit}
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions>
        <Button variant='contained' color='primary' onClick={handleAddProduct}>
          Köp
        </Button>
        <PickAmount inStock={inStock} handleAmountChange={handleAmountChange} />
      </CardActions>
    </Card>
  )
}

export default ProductCard
