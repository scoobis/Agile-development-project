import { Container, Grid, MenuItem, MenuList, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ProductForm from './ProductForm'
import useAuth from '../../utils/useAuth'
import MyProducts from './MyProducts/MyProducts'
import { addProduct } from '../../utils/api'
import Orders from './orders/Orders'

function ProducerDashboard () {
  const { user } = useAuth()
  const [activeComponent, setActiveComponent] = useState('')

  const handleAddProduct = (data) => addProduct(data)

  const OPTIONS = {
    ADD_PRODUCT: 'ADD_PRODUCT',
    VIEW_PRODUCTS: 'VIEW_PRODUCTS',
    VIEW_ORDERS: 'VIEW_ORDERS'
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case OPTIONS.ADD_PRODUCT:
        return (
          <>
            {getActiveComponentHeading('Lägg till produkt')}
            <ProductForm onSubmit={handleAddProduct} />
          </>
        )
      case OPTIONS.VIEW_PRODUCTS:
        return (
          <>
            {getActiveComponentHeading('Mina produkter')}
            <MyProducts />
          </>
        )
      case OPTIONS.VIEW_ORDERS:
        return (
          <>
            {getActiveComponentHeading('Mina beställningar')}
            <Orders />
          </>
        )
      default:
        break
    }
  }

  const getActiveComponentHeading = (title) => (
    <Typography variant='h3' component='h2' style={{ marginBottom: '20px' }}>
      {title}
    </Typography>
  )

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Producenter</Typography>
          <Typography variant='h5'>Välkommen {user.user.name}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Paper>
            <MenuList>
              <MenuItem
                selected={activeComponent === OPTIONS.ADD_PRODUCT}
                onClick={() => setActiveComponent(OPTIONS.ADD_PRODUCT)}
              >
                Lägg till produkt
              </MenuItem>
              <MenuItem
                selected={activeComponent === OPTIONS.VIEW_PRODUCTS}
                onClick={() => setActiveComponent(OPTIONS.VIEW_PRODUCTS)}
              >
                Mina produkter
              </MenuItem>
              <MenuItem
                selected={activeComponent === OPTIONS.VIEW_ORDERS}
                onClick={() => setActiveComponent(OPTIONS.VIEW_ORDERS)}
              >
                Mina beställningar
              </MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          {activeComponent && renderActiveComponent()}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProducerDashboard
