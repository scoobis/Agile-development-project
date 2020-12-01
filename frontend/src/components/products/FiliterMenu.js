import React, { useEffect, useState } from 'react'
import { Button, MenuItem, Grid, FormControl, InputLabel, Select } from '@material-ui/core'
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

const FilterMenu = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [category, setCategory] = useState('')
  const [availableCategories, setAvailableCategories] = useState([{}])

  useEffect(() => {
    getAllCategories().then((response) => {
      setAvailableCategories([...response])
      console.log(availableCategories)
    })
  }, [])

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <Grid item xs={12}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel htmlFor='filled-age-native-simple'>Ketegori</InputLabel>
        <Select
          native
          value={category}
          onChange={handleChangeCategory}
          inputProps={{
            name: 'age',
            id: 'filled-age-native-simple',
          }}
        >
          <option aria-label='None' value='' />
          {availableCategories.map((category) => {
            return <option value={category.id}>{category.name}</option>
          })}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FilterMenu
