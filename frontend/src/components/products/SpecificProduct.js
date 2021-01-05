import React from 'react'
import { Container, Grid } from '@material-ui/core'
import SpecificProductCard from './SpecificProductCard'
import { API_URL, PRODUCT_PLACEHOLDER_IMG_PATH } from '../../utils/config'
import SlickSlider from './SlickSlider'

const SpecificProduct = ({ product }) => {
  const getImages = () =>
    product.images && product.images.length
      ? product.images.map((img) => ({
        id: img.id,
        alt: img.altText,
        src: `${API_URL}/static/${img.imageName}`
      }))
      : [
        {
          id: 1,
          alt: 'Placeholder',
          src: PRODUCT_PLACEHOLDER_IMG_PATH
        }
      ]

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <SlickSlider images={getImages()} />
        </Grid>
        <Grid item md={6}>
          <SpecificProductCard {...product} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpecificProduct
