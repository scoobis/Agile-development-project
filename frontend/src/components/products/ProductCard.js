import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import { Typography, Button } from '@material-ui/core'
import Link from 'next/link'
import PickAmount from './PickAmount'

const ProductCard = (props) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      cursor: 'pointer',
      '&:hover': {
        border: 4,
        boxShadow: '0 2px 2px 2px black',
      },
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    img: {
      width: '260px',
      margin: 'auto',
      display: 'block',
    },
    a: {
      color: 'black',
      textDecoration: 'none',
    },
    media: {
      height: 200,
    },
    green: { color: 'green' },
    yellow: { color: '#dee600' },
  })

  const classes = useStyles()

  const { name, description, price, in_stock, imgSrc, id, unit } = props

  console.log(unit)

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
            <Typography className={(classes.pos, in_stock <= 10 ? classes.yellow : classes.green)} color='textSecondary'>
              {in_stock} i lager
            </Typography>
            <Typography variant='h5'>
              {price} kr / {unit}
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions>
        <Button variant='contained' color='primary' onClick={() => console.log('Add one to basket?')}>
          Köp
        </Button>
        <PickAmount in_stock={in_stock} />
      </CardActions>
    </Card>
  )
}

export default ProductCard
