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

  const [category, setCategory] = useState('')
  const [availableCategories, setAvailableCategories] = useState([{}])

  const [disableSubCategory, setDisableSubCategory] = useState(true)

  useEffect(() => {
    getAllCategories().then((response) => {
      setAvailableCategories([...response])
    })
  }, [])

  const handleChangeCategory = (event) => {
    const { value } = event.target
    setCategory(value)

    filterProducts(parseInt(value))
    console.log(availableCategories[value].children.length)

    parseInt(value) === -1 ? setDisableSubCategory(true) : setDisableSubCategory(false)
  }

  const handleChangeSubCategory = (event) => {}

  // TODO: why does availableCategories map twice????
  return (
    <Grid item xs={12}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Ketegori</InputLabel>
        <Select native value={category} onChange={handleChangeCategory}>
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
        <InputLabel className={classes.dissabledText}>Sub Ketegori</InputLabel>
        <Select disabled={disableSubCategory} native value={category} onChange={handleChangeSubCategory}>
          <option aria-label='None' value={-1} />
          {availableCategories.map((category) => {
            // availableCategories[value].children.length >= 1 ? availableCategories[value].children.length : inga kategorier
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FilterMenu
