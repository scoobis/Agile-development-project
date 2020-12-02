import React, { useState, useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import ProductCard from './ProductCard'
import FilterMenu from './FiliterMenu'
import { getAllProducts } from '../../utils/api'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts([...response])
    })
  }, [])

  const filterProducts = (id) => {
    console.log(id)
    // Needs new data in order to prevent previous filtered products that can not be fetched
    getAllProducts().then((response) => {
      setProducts(response.filter((product) => product.id === id || id === -1))
      // TODO: product.id should be category id instead
      // TODO: find if id is in array of category ids
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
                in_stock={product.in_stock}
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
