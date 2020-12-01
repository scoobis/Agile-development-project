import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
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

  // TODO: Add for child filtering
  const filterProducts = (id) => {
    products.filter(() => products.id === id)
  }

  useEffect(() => {})

  return (
    <Grid container spacing={2}>
      <FilterMenu />
      {products.map((product) => {
        return (
          <Grid item xs={12} sm={6} lg={3} key={product.id}>
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              in_stock={product.in_stock}
              imgSrc={product.imgSrc} // Needs image
              id={product.id}
              unit={product.unit}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Products
