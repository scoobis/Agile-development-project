import { TextField } from '@material-ui/core'
import React from 'react'

const FormField = ({ label, name, min, max, noShrink, optional, autoWidth, ...otherProps }) => {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={label}
      variant='outlined'
      margin='normal'
      required={!optional}
      fullWidth={!autoWidth}
      inputProps={{
        minLength: min,
        maxLength: max
      }}
      InputLabelProps={{
        shrink: !noShrink
      }}
      {...otherProps}
    />
  )
}

export default FormField
