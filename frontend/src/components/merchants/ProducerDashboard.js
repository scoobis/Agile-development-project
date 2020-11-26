import { Button, ButtonGroup, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddProductForm from './AddProductForm'
import useAuth from '../../utils/useAuth'

function ProducerDashboard () {
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const { user } = useAuth()

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
          <ButtonGroup orientation='vertical'>
            <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
            Lägg till produkt
            </Button>
            <Button>
            Mina produkter
            </Button>

          </ButtonGroup>
        </Grid>
        <Grid item xs={12} lg={8}>
          {showAddProductForm && (
            <AddProductForm />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProducerDashboard
