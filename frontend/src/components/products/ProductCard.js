import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import Link from 'next/link'
import PickAmount from './PickAmount'

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
  const { id, name, price, unit, inStock, imgSrc, orgNumber } = props
  const { addProduct } = useContext(CartContext)
  const [amount, setAmount] = useState(1)
  const classes = useStyles()

  console.log(orgNumber)

  const handleAmountChange = (value) => setAmount(value)

  return (
    <Card className={classes.root}>
      <Link href={`/produkter/${id}`}>
        <a className={classes.a}>
          <CardMedia className={classes.media} image={imgSrc} title='Produkt bild' />
          <CardContent>
            <Typography variant='h4' component='h2'>
              {name}
            </Typography>
            <Typography color='textSecondary'>Kategori?: Test</Typography>
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
        <Button variant='contained' color='primary' onClick={() => addProduct({ id, amount, name, price, unit, orgNumber })}>
          Köp
        </Button>
        <PickAmount inStock={inStock} handleAmountChange={handleAmountChange} />
      </CardActions>
    </Card>
  )
}

export default ProductCard
