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
import SelectTags from './SelectTags'
import useAuth from '../../utils/useAuth'
import { findParents } from '../../utils/helpers'
import { API_URL } from '../../utils/config'

const EMPTY_INITIAL_STATE = {
  product: {
    name: '',
    description: '',
    images: [],
    price: '',
    unit: '',
    salePrice: '',
    inStock: '',
    tags: [],
    categories: []
  },
  errors: {},
  message: ''
}

const ProductForm = ({ onSubmit, preFilled }) => {
  const { user } = useAuth()
  const [state, setState] = useState(
    preFilled ? { ...EMPTY_INITIAL_STATE, product: { ...preFilled, images: [] } } : EMPTY_INITIAL_STATE
  )
  const [categories, setCategories] = useState([])

  useEffect(() => {
    convertInitialImagesToFiles().then((files) => {
      if (files) {
        setState({
          ...state,
          product: { ...state.product, images: [...files] },
          preFilledImages: [...files]
        })
      }
    })
  }, [])

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

  async function convertInitialImagesToFiles () {
    if (preFilled && preFilled.images) {
      const files = await Promise.all(
        preFilled.images.map(async (image) => {
          const url = `${API_URL}/static/${image.image_name}`
          const response = await window.fetch(url)
          const blob = await response.blob()
          const finalResult = await blobToBase64(blob)
          const file = {}
          file.data = finalResult
          file.file = new window.File([blob], image.image_name, { type: blob.type })
          return file
        })
      )
      return files
    }
  }

  const blobToBase64 = (blob) => {
    const reader = new window.FileReader()
    reader.readAsDataURL(blob)
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }

  const getParentCategoriesForChildren = () => {
    const arr = []
    const selectedCategories = state.product.categories

    if (selectedCategories.length) {
      for (const id of selectedCategories) {
        const isTopLevelCategory = categories.find((c) => parseInt(c.id) === parseInt(id))

        if (isTopLevelCategory) {
          arr.push(parseInt(id))
        } else {
          for (const category of categories) {
            const parents = findParents(category, parseInt(id))
            if (parents) {
              arr.push(...parents)
            }
          }
        }
      }
    }
    return [...new Set(arr)]
  }

  const handleCategoryChange = (categories) => {
    delete state.errors.categories

    setState({
      ...state,
      product: {
        ...state.product,
        categories: categories
      },
      errors: { ...state.errors }
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

    if (!state.product.categories.length) {
      setState({
        ...state,
        errors: { ...state.errors, categories: 'Minst en kategori måste väljas' }
      })
    } else {
      const toSave = {
        ...state.product,
        orgNumber: user.user.orgNumber,
        categories: getParentCategoriesForChildren() || [],
        description: state.product.description || null,
        salePrice: state.product.salePrice || null
      }

      if (preFilled) {
        const { imagesToRemove, imagesToAdd } = getUpdatedImages()
        toSave.imagesToRemove = imagesToRemove
        toSave.imagesToAdd = imagesToAdd
      }

      onSubmit(toSave).then((response) => {
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
  }

  const getUpdatedImages = () => {
    if (preFilled && preFilled.images) {
      const images = state.product.images
      const preFilledImages = state.preFilledImages

      const imagesToRemove = preFilledImages.filter((img) => !images.find((i) => i.data === img.data))
      const idsToRemove = preFilled.images
        .filter((img) => imagesToRemove.find((i) => img.image_name === i.file.name))
        .map((img) => img.id)

      const imagesToAdd = images.filter((img) => !preFilledImages.find((i) => i.data === img.data))

      return { imagesToRemove: idsToRemove, imagesToAdd }
    }
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

  const handleTagsChange = (tags) => {
    setState({
      ...state,
      product: { ...state.product, tags }
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
            <Box mb={2}>
              <Typography variant='h5'>Taggar</Typography>
            </Box>
            <Box pb={2}>
              <SelectTags onChange={handleTagsChange} defaultValues={state.tags} max={15} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography variant='h5'>Kategorier</Typography>
              {state.errors.categories && <Typography color='error'>{state.errors.categories}</Typography>}
            </Box>
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
