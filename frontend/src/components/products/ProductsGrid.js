import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { API_URL } from '../../utils/config'
import ProductCard from './ProductCard'

const ProductsGrid = ({ products }) => {
  const getFirstImage = (images) => {
    if (images.length) {
      return `${API_URL}/static/${images[0].image_name}`
    }
    return '/apples.jpg'
  }

  return (
    <div>
      <Grid container spacing={3}>
        {products && products.length ? (
          products.map((product) => (
            <Grid item key={product.id}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                inStock={product.inStock}
                imgSrc={getFirstImage(product.images)}
                id={product.id}
                unit={product.unit}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align='center' variant='h5'>
              Inga produkter hittades
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default ProductsGrid
