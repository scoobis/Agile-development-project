import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const SelectOption = () => {
  // TODO: Should get options from product
  const options = ['Röda', 'Gröna']
  const [option, setOption] = useState([options])

  const handleChange = (event) => {
    setOption(event.target.value)
  }

  return (
    <TextField select value={option} onChange={handleChange} SelectProps={{ native: true }} helperText='Välj ett alternativ'>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>
  )
}

export default SelectOption
