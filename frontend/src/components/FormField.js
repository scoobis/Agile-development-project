import { TextField } from '@material-ui/core'
import React from 'react'

const FormField = ({ label, name, min, max, ...otherProps }) => {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={label}
      variant='outlined'
      inputProps={{
        minLength: min,
        maxLength: max
      }}
      {...otherProps}
    />
  )
}

export default FormField
