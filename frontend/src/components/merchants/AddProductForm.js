import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import MultipleSelect from './MultipleSelect'
import { addProduct } from '../../utils/api'
import UploadImages from './UploadImages'
import useAuth from '../../utils/useAuth'

function AddProductForm () {
  const { user } = useAuth()
  const [state, setState] = useState({
    product: {
      name: '',
      description: '',
      images: [],
      price: '',
      unit: '',
      salePrice: '',
      inStock: '',
      categories: []
    },
    errors: {},
    message: ''
  })

  const handleCategoryChange = categories => {
    setState({
      ...state,
      product: {
        ...state.product,
        categories: categories
      }
    })
  }

  const handleImageChange = images => {
    setState({
      ...state,
      product: {
        ...state.product,
        images: images
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addProduct({ ...state.product, orgNumber: user.user.orgNumber })
      .then(response => setState({ ...state, message: response.message }))
  }

  const handleChange = e => {
    e.target.setCustomValidity('')

    if (e.target.validity.valid) {
      delete state.errors[e.target.name]
    } else {
      state.errors[e.target.name] = e.target.validationMessage
    }

    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value

    setState({
      ...state,
      product: { ...state.product, [e.target.name]: value },
      errors: { ...state.errors }
    })
  }

  const handleError = e => {
    setState({
      ...state,
      errors: {
        ...state.errors,
        [e.target.name]: e.target.validationMessage
      }
    })
  }

  return (
    <Container>
      {state.message && (
        <Typography color='secondary'>{state.message}</Typography>
      )}

      <form onSubmit={handleSubmit} onInvalid={handleError}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder='Namn'
              name='name'
              label='Namn'
              value={state.product.name}
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              required
              inputProps={{
                minLength: 3,
                maxLength: 20
              }}
              error={!!state.errors.name}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder='Beskrivning'
              name='description'
              label='Beskrivning'
              value={state.product.description}
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              multiline
              rows={4}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <UploadImages images={state.product.images} setImages={handleImageChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              placeholder='Pris'
              name='price'
              label='Pris'
              value={state.product.price}
              type='number'
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              error={!!state.errors.price}
              inputProps={{
                minLength: 1,
                maxLength: 20
              }}
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              placeholder='Rabatterat pris'
              name='salePrice'
              label='Rabatterat pris'
              value={state.product.salePrice}
              type='number'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              variant='outlined'
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              placeholder='kg/l/st'
              name='unit'
              label='Enhetpris'
              value={state.product.unit}
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                minLength: 2,
                maxLength: 20
              }}
              required
              error={!!state.errors.unit}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder='Antal i lager'
              name='inStock'
              label='Antal i lager'
              value={state.product.inStock}
              type='number'
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              error={!!state.errors.inStock}
              inputProps={{
                minLength: 1,
                maxLength: 9999999
              }}
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' style={{ marginBottom: '20px' }}>Kategorier</Typography>
            <Box style={{ maxHeight: '200px', overflow: 'auto' }}>
              <MultipleSelect checked={state.product.categories} setChecked={handleCategoryChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              Skapa produkt
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default AddProductForm
