import React, { useState, useEffect } from 'react'
import { Grid, Container, Typography } from '@material-ui/core'
import ProductCard from './ProductCard'
import FilterMenu from './FiliterMenu'
import { getAllProducts, getAllProductsFromCategory } from '../../utils/api'
import { API_URL } from '../../utils/config'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      response.length && setProducts([...response])
    })
  }, [])

  const filterProducts = (id) => {
    getAllProductsFromCategory(id).then((response) => {
      response.length && setProducts([...response])
    })
  }

  const getFirstImage = (images) => {
    if (images.length) {
      return `${API_URL}/static/${images[0].image_name}`
    }
    return '/apples.jpg'
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item md={3} />
        <Grid item md={9}>
          <Typography variant='h1'>Produkter</Typography>
        </Grid>
        <Grid item md={3}>
          <FilterMenu filterProducts={filterProducts} />
        </Grid>
        <Grid item md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} />
            {products.length ? (
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
              <Typography variant='h4'>Inga produkter hittades</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Products
