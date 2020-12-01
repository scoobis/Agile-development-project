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
}))

const FilterMenu = (props) => {
  const classes = useStyles()
  const { filterProducts } = props

  const [category, setCategory] = useState('')
  const [availableCategories, setAvailableCategories] = useState([{}])

  useEffect(() => {
    getAllCategories().then((response) => {
      setAvailableCategories([...response])
    })
  }, [])

  const handleChangeCategory = (event) => {
    const { value } = event.target
    setCategory(value)
    filterProducts(parseInt(value))
  }

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
    </Grid>
  )
}

export default FilterMenu
