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
    minWidth: 130,
    fontWeight: 'bold'
  }
}))

const SetStatus = (props) => {
  const { status } = props
  const [currentStatus, setCurrentStatus] = useState(status)
  const [color, setColor] = useState('')
  const classes = useStyles()

  const handleChange = (e) => {
    setCurrentStatus(e.target.value)
  }
  useEffect(() => {
    if (currentStatus === 'Inkommen') setColor('green')
    else if (currentStatus === 'Leveransklar') setColor('green')
    else if (currentStatus === 'Levererad') setColor('green')
    else if (currentStatus === 'Makulerad') setColor('red')
  }, [currentStatus])

  return (
    <FormControl className={classes.formControl}>
      <Select style={{ color: color, fontWeight: 'bold' }} value={currentStatus} native onChange={handleChange}>
        <option aria-label='none' value='' />
        <option style={{ color: 'green', fontWeight: 'bold' }} value='Inkommen'>
          Inkommen
        </option>
        <option style={{ color: 'green', fontWeight: 'bold' }} value='Leveransklar'>
          Leveransklar
        </option>
        <option style={{ color: 'green', fontWeight: 'bold' }} value='Levererad'>
          Levererad
        </option>
        <option style={{ color: 'red', fontWeight: 'bold' }} value='Makulerad'>
          Makulerad
        </option>
      </Select>
    </FormControl>
  )
}

export default SetStatus
