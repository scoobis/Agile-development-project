import React, { useEffect, useState } from 'react'
import { Grid, FormControl, InputLabel, Select, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getCategories } from '../../utils/api'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    '& > label': {
      marginTop: theme.spacing(-1)
    }
  },
  disabledText: { opacity: 0.6 }
}))

const FilterMenu = (props) => {
  const classes = useStyles()
  const { filterProducts } = props

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [secondSubCategoryId, setSecondSubCategoryId] = useState('')
  const [availableCategories, setAvailableCategories] = useState([])
  const [hasSubCategory, setHasSubCategory] = useState({
    cat1: false,
    cat2: false
  })

  useEffect(() => {
    getCategories().then((response) => setAvailableCategories([...response]))
  }, [])

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value)
    setSubCategoryId('')
    setSecondSubCategoryId('')
    filterProducts(parseInt(e.target.value))

    // Check if category has children (sub category)
    const test = availableCategories.find((x) => parseInt(e.target.value) === x.id)
    test && test.children
      ? setHasSubCategory({ cat1: true, cat2: false })
      : setHasSubCategory({ cat1: false, cat2: false })
  }

  const handleChangeSubCategory = (e) => {
    setSubCategoryId(e.target.value)
    setSecondSubCategoryId('')
    filterProducts(parseInt(e.target.value))

    // Check if sub category has children (sub category)
    let test = getSubCategory()
    test = test.children.find((x) => parseInt(e.target.value) === x.id)
    test && test.children
      ? setHasSubCategory({ cat1: hasSubCategory.cat1, cat2: true })
      : setHasSubCategory({ cat1: hasSubCategory.cat1, cat2: false })
  }

  const getSubCategory = () => availableCategories.find((x) => parseInt(categoryId) === x.id)

  const getSubCategory2 = () => {
    const test = availableCategories.find((x) => parseInt(categoryId) === x.id)
    return test.children.find((x) => parseInt(subCategoryId) === x.id).children
  }

  const handleSecondCategory = (e) => {
    filterProducts(parseInt(e.target.value))
    setSecondSubCategoryId(e.target.value)
  }

  return (
    <Grid item xs={12}>
      <Box pb={2}>
        <Typography>Filtrera på kategori</Typography>
      </Box>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel shrink filled>
          Kategori
        </InputLabel>
        <Select native value={categoryId} onChange={handleChangeCategory}>
          <option value={-1}>Alla</option>
          {availableCategories.length &&
            availableCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel shrink className={!hasSubCategory.cat1 ? classes.disabledText : ''}>
          {hasSubCategory.cat1 ? 'Välj underkategori' : 'Underkategori'}
        </InputLabel>
        <Select value={subCategoryId} disabled={!hasSubCategory.cat1} onChange={handleChangeSubCategory} native>
          <option aria-label='none' value={categoryId}>
            Alla
          </option>
          {hasSubCategory.cat1 &&
            getSubCategory().children.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel shrink className={!hasSubCategory.cat2 ? classes.disabledText : ''}>
          {hasSubCategory.cat2 ? 'Välj underkategori' : 'Underkategori'}
        </InputLabel>
        <Select value={secondSubCategoryId} disabled={!hasSubCategory.cat2} onChange={handleSecondCategory} native>
          <option aria-label='none' value={subCategoryId}>
            Alla
          </option>
          {hasSubCategory.cat2 &&
            getSubCategory2().map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FilterMenu
