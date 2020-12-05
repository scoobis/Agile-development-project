import React, { useState, useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import ProductCard from './ProductCard'
import FilterMenu from './FiliterMenu'
import { getAllProducts, getAllProductsFromCategory } from '../../utils/api'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts([...response])
    })
  }, [])

  const filterProducts = (id) => {
    getAllProductsFromCategory(id).then((response) => {
      setProducts([...response])
    })
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <FilterMenu filterProducts={filterProducts} />
        {products.map((product) => {
          return (
            <Grid item xs={3} key={product.id}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                inStock={product.inStock}
                imgSrc='/apples.jpg' // Needs image
                id={product.id}
                unit={product.unit}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Products
