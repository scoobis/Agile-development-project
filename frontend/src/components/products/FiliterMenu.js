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
    const test = availableCategories.find((x) => parseInt(e.target.value) === x.id)
    test && test.children ? setHasSubCategory({ cat1: true, cat2: hasSubCategory.cat2 }) : setHasSubCategory({ cat1: false, cat2: hasSubCategory.cat2 })
  }

  const handleChangeSubCategory = (e) => {
    setSubCategoryId(e.target.value)
    filterProducts(parseInt(e.target.value))
  }

  const subCat = () => availableCategories.find((x) => parseInt(categoryId) === x.id)

  // TODO: why does availableCategories map twice????
  return (
    <Grid item xs={12} className={classes.border}>
      <Typography variant='body2'>Välj Kategorier</Typography>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Ketegori</InputLabel>
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
        <InputLabel className={!hasSubCategory.cat1 ? classes.dissabledText : ''}>{hasSubCategory.cat1 ? 'Välj Sub-Ketegori' : 'Ingen Sub-Kategori'}</InputLabel>
        <Select value={subCategoryId} disabled={!hasSubCategory.cat1} onChange={handleChangeSubCategory} native>
          <option aria-label='None' value={-1}>
            Alla
          </option>
          {hasSubCategory.cat1
            ? subCat().children.map((category) => {
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
