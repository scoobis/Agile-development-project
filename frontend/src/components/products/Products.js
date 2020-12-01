import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'
import { ProductContext } from '../../context/ProductContext'
import FilterMenu from './FiliterMenu'

const Products = () => {
  const { products } = useContext(ProductContext)

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
