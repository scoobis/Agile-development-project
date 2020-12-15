import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import SpecificProductCard from './SpecificProductCard'
import { getOneProduct } from '../../utils/api'
import { API_URL } from '../../utils/config'
import SlickSlider from './SlickSlider'

const SpecificProduct = (props) => {
  const [product, setProduct] = useState({})
  const { productId, onLoad } = props

  useEffect(() => {
    getOneProduct(productId).then((response) => {
      setProduct(response)
      onLoad(response.name)
    })
  }, [props])

  const { name, description, price, salePrice, unit, inStock, id, images } = product

  const getImages = () =>
    images && images.length
      ? images.map((img) => ({
          id: img.id,
          alt: img.altText,
          src: `${API_URL}/static/${img.imageName}`
        }))
      : [
          {
            id: 1,
            alt: 'Apples',
            src: '/apples.JPG'
          }
        ]

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <SlickSlider images={getImages()} />
        </Grid>
        <Grid item md={6}>
          <SpecificProductCard
            inStock={inStock}
            price={price}
            salePrice={salePrice}
            name={name}
            unit={unit}
            id={id}
            description={description}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpecificProduct
