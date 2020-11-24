import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'
import { ProductContext } from '../../context/productContext/ProductContext'

const Products = () => {
  const { products } = useContext(ProductContext)
  console.log(products)

  return (
    <Grid container spacing={2}>
      {products.map((product) => {
        return (
          <Grid item xs={12} sm={6} lg={3} key={product.id}>
            <ProductCard
              title={product.title}
              description={product.description}
              price={product.price}
              stock={product.stock}
              imgSrc={product.imgSrc}
              id={product.id}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Products
