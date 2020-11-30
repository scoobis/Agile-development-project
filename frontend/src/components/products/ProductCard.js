import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent } from '@material-ui/core'
import { Typography, Button } from '@material-ui/core'
import Link from 'next/link'

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
      width: '300px',
    },
    a: {
      color: 'black',
      textDecoration: 'none',
    },
  })

  const classes = useStyles()

  const { title, description, price, stock, imgSrc, id } = props

  return (
    <Card className={classes.root}>¨
            <Link href={`/produkter/${id}`}>
          <a className={classes.a}>
      <CardContent>
            <img className={classes.img} alt='Produkt bild' src={imgSrc} />
            <Typography variant='h4' component='h2'>
              {title}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {description}
            </Typography>
            <Typography variant='h5'>{price} kr</Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary' onClick={() => console.log('Add one to basket?')}>
          Köp
        </Button>
        <Typography className={classes.pos} color='textSecondary'>
          {Math.ceil(stock / 10) * 10}+ i lager
        </Typography>
      </CardActions>
      </a>
        </Link>
    </Card>
  )
}

export default ProductCard
