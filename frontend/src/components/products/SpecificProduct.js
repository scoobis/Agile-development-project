import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import { ProductContext } from '../../context/productContext/ProductContext'
import SpecificProductCard from './SpecificProductCard'

const SpecificProduct = (props) => {
  const useStyles = makeStyles({
    img: {
      borderRadius: '20px',
      width: '500px',
    },
    container: { boxShadow: '0 1px 1px 1px black' },
  })

  // TODO: get data from api instead
  const { products } = useContext(ProductContext)
  const { specifikProduktId } = props
  const product = products.find((x) => x.id === parseInt(specifikProduktId))
  const { imgSrc, title, description, stock } = product

  // TODO: Problem when reloading page!

  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.pos} variant='h6' color='textSecondary'>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <img className={classes.img} alt='Produkt bild' src={`/${imgSrc}`} />
        </Grid>
        <Grid item xs={5}>
          <SpecificProductCard stock={stock} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpecificProduct
