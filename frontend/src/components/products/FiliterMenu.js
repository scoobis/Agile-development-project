import React, { useState } from 'react'
import { Button, MenuItem, Grid, FormControl, InputLabel, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}))

const FilterMenu = () => {
  const classes = useStyles()
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)

  const [allCategories, setAllCategories] = useState([{}])

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <Grid item xs={12}>
      <Button className={classes.button} onClick={handleOpen}>
        Välj Ketegori
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel>Ketegori</InputLabel>
        <Select open={open} onClose={handleClose} onOpen={handleOpen} value={category} onChange={handleChange}>
          <MenuItem value=''>
            <em>Ingen</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FilterMenu
