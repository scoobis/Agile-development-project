import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'

const Products = () => {

    const [products, setProducts] = useState([
        { title: 'Äpple', description: 'Just a description', price: '70', stock: 50, imgSrc: 'apples.jpg', id: 1 },
        { title: 'Äpple', description: 'Just a description', price: '70', stock: 65, imgSrc: 'apples.jpg', id: 2 }
    ])

    return (
        <Grid container spacing={2}>
            {products.map((product) => {
                return (
                    <Grid item xs={12} sm={6} lg={3}>
                        <ProductCard
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            stock={product.stock}
                            imgSrc={product.imgSrc} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Products
