import React, { useState, useEffect } from 'react'
import { Grid, Container, Typography } from '@material-ui/core'
import FilterMenu from './FiliterMenu'
import { getAllProducts, getAllProductsFromCategory } from '../../utils/api'
import ProductsGrid from './ProductsGrid'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      response.length && setProducts([...response])
    })
  }, [])

  const filterProducts = (id) => {
    getAllProductsFromCategory(id).then(({ data }) => {
      data && setProducts([...data.products])
    })
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={3} />
        <Grid item md={9}>
          <Typography variant='h1'>Produkter</Typography>
        </Grid>
        <Grid item md={3}>
          <FilterMenu filterProducts={filterProducts} />
        </Grid>
        <Grid item md={9}>
          <ProductsGrid products={products} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Products
