import React, { useState, useEffect } from 'react'
import { Grid, Container, Typography } from '@material-ui/core'
import FilterMenu from './FiliterMenu'
import { getAllProducts, getAllProductsFromCategory } from '../../utils/api'
import ProductsGrid from './ProductsGrid'

const Products = () => {
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      if (response.length) {
        setAllProducts(response)
        setProducts(response)
      }
    })
  }, [])

  const filterProducts = (id) => {
    if (id === -1 || id === '-1') {
      setProducts(allProducts)
    } else {
      getAllProductsFromCategory(id).then(({ data }) => {
        setProducts(data.products)
      })
    }
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
