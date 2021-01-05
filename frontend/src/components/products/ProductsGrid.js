import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { API_URL, PRODUCT_PLACEHOLDER_IMG_PATH } from '../../utils/config'
import ProductCard from './ProductCard'

const ProductsGrid = ({ products }) => {
  const getFirstImage = (images) => {
    if (images.length) {
      return `${API_URL}/static/${images[0].imageName}`
    }
    return PRODUCT_PLACEHOLDER_IMG_PATH
  }

  const getFirstCategory = (categories) => {
    const category = categories.find((c) => c.parentId)
    return category ? category.name : categories[0].name
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
                orgNumber={product.orgNumber}
                category={getFirstCategory(product.categories)}
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
