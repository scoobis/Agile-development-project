import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import SpecificProductCard from './SpecificProductCard'
import { getOneProduct } from '../../utils/api'
import { API_URL } from '../../utils/config'

const useStyles = makeStyles({
  img: {
    maxWidth: '100%',
    maxHeight: '60vh',
    margin: '0 auto'
  },
  container: { boxShadow: '0 0 3px 2px rgb(0,0,0,.2)' },
  gridContainer: { paddingTop: '40px' }
})

const SpecificProduct = (props) => {
  const classes = useStyles()
  const [product, setProduct] = useState({})
  const { productId, onLoad } = props

  useEffect(() => {
    getOneProduct(productId).then((response) => {
      console.log(response)
      setProduct(response)
      onLoad(response.name)
    })
  }, [props])

  const { name, description, price, unit, inStock, id, images } = product
  const DEFAULT_IMG_SRC = '/apples.JPG'

  return (
    <Container className={classes.container}>
      <Grid className={classes.gridContainer} container spacing={2}>
        <Grid item xs={7}>
          {images && images.length ? (
            images.map((img) => <img alt={img.alt_text} key={img.id} src={`${API_URL}/static/${img.image_name}`} />)
          ) : (
            <img className={classes.img} alt='Produkt bild' src={DEFAULT_IMG_SRC} />
          )}
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
