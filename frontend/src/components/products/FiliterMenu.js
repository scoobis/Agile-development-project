import React, { useEffect, useState } from 'react'
import { Grid, FormControl, InputLabel, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAllCategories } from '../../utils/api'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  dissabledText: { color: 'red' },
  border: { borderBottom: '2px solid #a6a6a6', marginBottom: '30px' },
}))

const FilterMenu = (props) => {
  const classes = useStyles()
  const { filterProducts } = props

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [availableCategories, setAvailableCategories] = useState([{}])
  const [hasSubCategory, setHasSubCategory] = useState({
    cat1: false,
    cat2: false,
  })

  useEffect(() => {
    getAllCategories().then((response) => setAvailableCategories([...response]))
  }, [])

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value)
    filterProducts(parseInt(e.target.value))

    // Check if category has children (sub category)
    const test = availableCategories.find((x) => parseInt(e.target.value) === x.id)
    test && test.children ? setHasSubCategory({ cat1: true, cat2: false }) : setHasSubCategory({ cat1: false, cat2: false })
  }

  const handleChangeSubCategory = (e) => {
    setSubCategoryId(e.target.value)
    filterProducts(parseInt(e.target.value))

    // Check if sub category has children (sub category)
    let test = getSubCategory()
    test = test.children.find((x) => parseInt(e.target.value) === x.id)
    test && test.children ? setHasSubCategory({ cat1: hasSubCategory.cat1, cat2: true }) : setHasSubCategory({ cat1: hasSubCategory.cat1, cat2: false })
  }

  const getSubCategory = () => availableCategories.find((x) => parseInt(categoryId) === x.id)

  const getSubCategory2 = () => {
    let test = availableCategories.find((x) => parseInt(categoryId) === x.id)
    return test.children.find((x) => parseInt(subCategoryId) === x.id).children
  }

  const remove = () => {
    console.log('sss')
  }

  // TODO: why does availableCategories map twice????
  return (
    <Grid item xs={12} className={classes.border}>
      <Typography variant='body2'>Välj Kategorier</Typography>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel shrink>Ketegori</InputLabel>
        <Select native value={categoryId} onChange={handleChangeCategory}>
          <option value={-1}>Alla</option>
          {availableCategories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })}
        </Select>
      </FormControl>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel shrink className={!hasSubCategory.cat1 ? classes.dissabledText : ''}>
          {hasSubCategory.cat1 ? 'Välj Sub-Ketegori' : 'Ingen Sub-Kategori'}
        </InputLabel>
        <Select value={subCategoryId} disabled={!hasSubCategory.cat1} onChange={handleChangeSubCategory} native>
          <option value={categoryId}>Alla</option>
          {hasSubCategory.cat1
            ? getSubCategory().children.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })
            : null}
        </Select>
      </FormControl>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel shrink className={!hasSubCategory.cat2 ? classes.dissabledText : ''}>
          {hasSubCategory.cat2 ? 'Välj Sub-Ketegori' : 'Ingen Sub-Kategori'}
        </InputLabel>
        <Select value={subCategoryId} disabled={!hasSubCategory.cat2} onChange={remove} native>
          <option aria-label='None' value={-1}>
            Alla
          </option>
          {hasSubCategory.cat2
            ? getSubCategory2().map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })
            : null}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FilterMenu
