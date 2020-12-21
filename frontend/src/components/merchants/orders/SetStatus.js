import React from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

const SetStatus = () => {
  const classes = useStyles()
  return (
    <FormControl variant='outlined' className={classes.formControl}>
      <InputLabel shrink>Sätt status</InputLabel>
      <Select value={status} native>
        <option aria-label='none' value={status}>
          {status}
        </option>
        <option>Status 1</option>
      </Select>
    </FormControl>
  )
}

export default SetStatus
