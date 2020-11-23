import React from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'

const Products = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
                <ProductCard />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <ProductCard />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <ProductCard />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <ProductCard />
            </Grid>
        </Grid>
    )
}

export default Products
