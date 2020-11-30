import { Container, Grid, MenuItem, MenuList, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddProductForm from './AddProductForm'
import useAuth from '../../utils/useAuth'
import MyProducts from './MyProducts'
import { getProductsByProducer } from '../../utils/api'

function ProducerDashboard () {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [activeComponent, setActiveComponent] = useState('')

  const OPTIONS = {
    ADD_PRODUCT: 'ADD_PRODUCT',
    VIEW_PRODUCTS: 'VIEW_PRODUCTS'
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case OPTIONS.ADD_PRODUCT:
        return <AddProductForm />
      case OPTIONS.VIEW_PRODUCTS:
        products.length === 0 && getProductsByProducer(user.user.orgNumber).then(setProducts)
        return <MyProducts products={products} />
      default:
        break
    }
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Producenter
          </Typography>
          <Typography variant='h5'>
            Välkommen {user.user.name}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <MenuList>
            <MenuItem onClick={() => setActiveComponent(OPTIONS.ADD_PRODUCT)}>Lägg till produkt</MenuItem>
            <MenuItem onClick={() => setActiveComponent(OPTIONS.VIEW_PRODUCTS)}>Mina produkter</MenuItem>
          </MenuList>
        </Grid>
        <Grid item xs={12} lg={8}>
          {activeComponent && renderActiveComponent()}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProducerDashboard
