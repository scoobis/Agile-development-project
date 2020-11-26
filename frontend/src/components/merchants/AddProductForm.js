import React, { useEffect, useState } from 'react'
import { Container, FormControl, Grid, TextField, Typography } from '@material-ui/core'
import SelectCategories from './SelectCategories'

function AddProductForm () {
  const handleSubmit = (data) => {
    const productToAdd = {
      id: Math.random(1, 1000),
      name: data.name,
      description: data.description,
      imageSrc: data.imgSrc,
      price: Number(data.price),
      unit: data.unit,
      salePrice: Number(data.salePrice),
      quantity: Number(data.quantity),
      created_at: new Date()
    }

    console.log({ productToAdd })

    // createProduct(data)
  }
  return (
    <Container>
      <Typography>Lägg till produkt</Typography>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid item xs={12}>
            <TextField
              name='name'
              type='text'
              label='Namn'
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='description'
              type='text'
              label='Beskrivning'
              variant='outlined'
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='unit'
              type='text'
              label='Enhet (kg/st/liter, etc.)'
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='price'
              type='number'
              label='Pris'
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='salePrice'
              type='number'
              label='Rabatterat pris'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='quantity'
              type='text'
              label='Antal i lager'
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='unit'
              type='text'
              label='Enhet (kg/st/liter, etc.)'
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <SelectCategories />
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default AddProductForm
