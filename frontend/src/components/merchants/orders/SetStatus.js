import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    width: '150px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130
  }
}))

const SetStatus = (props) => {
  const { status } = props
  const [currentStatus, setCurrentStatus] = useState(status)
  const classes = useStyles()

  const handleChange = (e) => {
    setCurrentStatus(e.target.value)
  }

  return (
    <FormControl className={classes.formControl}>
      <Select style={{ color: 'red' }} value={currentStatus} native onChange={handleChange}>
        <option aria-label='none' value='' />
        <option value='status 1' style={{ color: 'red' }}>
          Status 1
        </option>
        <option value={2}>Status 2</option>
      </Select>
    </FormControl>
  )
}

export default SetStatus
