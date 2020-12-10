import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import SpecificProductCard from './SpecificProductCard'
import { getOneProduct } from '../../utils/api'

const useStyles = makeStyles({
  img: {
    borderRadius: '20px',
    width: '500px'
  },
  container: { boxShadow: '0 1px 1px 1px black' },
  gridContainer: { paddingTop: '40px' }
})

const SpecificProduct = (props) => {
  const classes = useStyles()
  const [product, setProduct] = useState({})
  const { productId, onLoad } = props

  useEffect(() => {
    getOneProduct(productId).then((response) => {
      setProduct(response)
      onLoad(response.name)
    })
  }, [props])

  const { name, description, price, unit, inStock, id } = product
  const imgSrc = 'apples.JPG' // TODO: Get img from backend

  return (
    <Container className={classes.container}>
      <Grid className={classes.gridContainer} container spacing={2}>
        <Grid item xs={7}>
          <img className={classes.img} alt='Produkt bild' src={`/${imgSrc}`} />
        </Grid>
        <Grid item xs={5}>
          <SpecificProductCard inStock={inStock} price={price} name={name} unit={unit} id={id} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.pos} variant='h6' color='textSecondary'>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpecificProduct
