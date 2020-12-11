import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import MultipleSelect from './MultipleSelect'
import { getCategories } from '../../utils/api'
import UploadImages from './UploadImages'
import useAuth from '../../utils/useAuth'
import { findParents } from '../../utils/helpers'

const EMPTY_INITIAL_STATE = {
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
}

function ProductForm ({ onSubmit, preFilled }) {
  const { user } = useAuth()
  const [state, setState] = useState(
    preFilled ? { ...EMPTY_INITIAL_STATE, product: { ...preFilled } } : EMPTY_INITIAL_STATE
  )
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((categories) => {
      const result = JSON.parse(
        JSON.stringify(categories)
          .replace(/"name":/g, '"label":')
          .replace(/"id":/g, '"value":')
      )

      setCategories(result)
    })
  }, [])

  const getParentCategoriesForChildren = () => {
    const arr = []
    const selectedCategories = state.product.categories
    if (selectedCategories.length > 1) {
      for (const selectedCatId of selectedCategories) {
        for (const category of categories) {
          const parents = findParents(category, parseInt(selectedCatId))
          if (parents) {
            arr.push(...parents)
          }
        }
      }
    } else if (selectedCategories.length === 1) {
      arr.push(parseInt(selectedCategories[0]))
    }
    return [...new Set(arr)]
  }

  const handleCategoryChange = (categories) => {
    setState({
      ...state,
      product: {
        ...state.product,
        categories: categories
      }
    })
  }

  const handleImageChange = (images) => {
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

    onSubmit({
      ...state.product,
      orgNumber: user.user.orgNumber,
      categories: getParentCategoriesForChildren() || [],
      description: state.product.description || ''
    }).then((response) => {
      if (response.success || response.status === 200) {
        preFilled
          ? setState({ ...state, message: response.message, errors: {} })
          : setState({ ...EMPTY_INITIAL_STATE, message: response.message, errors: {} })
      } else if (response.status !== 200) {
        setState({ ...state, message: response.data.message })
      } else {
        setState({ ...state, message: response.message })
      }
    })
  }

  const handleChange = (e) => {
    e.target.setCustomValidity('')

    if (e.target.validity.valid) {
      delete state.errors[e.target.name]
    } else {
      state.errors[e.target.name] = e.target.validationMessage
    }

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setState({
      ...state,
      product: { ...state.product, [e.target.name]: value },
      errors: { ...state.errors }
    })
  }

  const handleSelectChange = (e) => {
    delete state.errors[e.target.name]

    setState({
      ...state,
      product: { ...state.product, [e.target.name]: e.target.value }
    })
  }

  const handleError = (e) => {
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
                minLength: 2,
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
            <FormControl required variant='outlined' margin='normal' fullWidth error={!!state.errors.unit}>
              <InputLabel id='name'>Enhet</InputLabel>
              <Select label='Enhet' id='name' name='unit' value={state.product.unit} onChange={handleSelectChange}>
                <MenuItem value='st'>st</MenuItem>
                <MenuItem value='kg'>kg</MenuItem>
                <MenuItem value='l'>liter</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              placeholder='Antal enheter i lager'
              name='inStock'
              label='Antal enheter i lager'
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
            <Typography variant='h5' style={{ marginBottom: '20px' }}>
              Kategorier
            </Typography>
            <Box style={{ maxHeight: '200px', overflow: 'auto' }}>
              <MultipleSelect
                options={categories}
                checked={state.product.categories}
                onChecked={handleCategoryChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Skapa produkt
            </Button>
          </Grid>
        </Grid>
      </form>
      {state.message && <Typography style={{ marginTop: '20px' }}>{state.message}</Typography>}
    </Container>
  )
}

export default ProductForm
