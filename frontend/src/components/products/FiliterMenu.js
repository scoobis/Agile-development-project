import React, { useEffect, useState } from 'react'
import { Grid, FormControl, InputLabel, Select } from '@material-ui/core'
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
}))

const FilterMenu = (props) => {
  const classes = useStyles()
  const { filterProducts } = props

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [availableCategories, setAvailableCategories] = useState([{}])

  useEffect(() => {
    getAllCategories().then((response) => {
      setAvailableCategories([...response])
    })
  }, [])

  const handleChangeCategory = (event) => {
    const { value } = event.target
    setCategoryId(value)

    filterProducts(parseInt(value))
  }

  const hasSubCategory = () => {
    const test = availableCategories.find((x) => parseInt(categoryId) === x.id)
    return test && test.children
  }

  const handleChangeSubCategory = (event) => {
    setSubCategoryId(event.target.value)
  }

  const test = () => availableCategories.find((x) => parseInt(categoryId) === x.id)

  // TODO: why does availableCategories map twice????
  return (
    <Grid item xs={12}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Ketegori</InputLabel>
        <Select native value={categoryId} onChange={handleChangeCategory}>
          <option aria-label='None' value={-1} />
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
        <InputLabel className={!hasSubCategory() ? classes.dissabledText : ''}>Sub Ketegori</InputLabel>
        <Select native value={subCategoryId} disabled={!hasSubCategory()} onChange={handleChangeSubCategory}>
          <option aria-label='None' value={-1} />
          {hasSubCategory()
            ? test().children.map((category) => {
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
