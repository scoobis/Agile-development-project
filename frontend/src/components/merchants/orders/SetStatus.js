import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LEVERERAD, INKOMMEN, MAKULERAD, LERVERANSKLAR } from '../../../utils/config'

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
    if (currentStatus === INKOMMEN) setColor('green')
    else if (currentStatus === LERVERANSKLAR) setColor('green')
    else if (currentStatus === LEVERERAD) setColor('green')
    else if (currentStatus === MAKULERAD) setColor('red')
  }, [currentStatus])

  return (
    <FormControl className={classes.formControl}>
      <Select style={{ color: color, fontWeight: 'bold' }} value={currentStatus} native onChange={handleChange}>
        <option aria-label='none' value='' />
        <option style={{ color: 'green', fontWeight: 'bold' }} value={INKOMMEN}>
          {INKOMMEN}
        </option>
        <option style={{ color: 'green', fontWeight: 'bold' }} value={LERVERANSKLAR}>
          {LERVERANSKLAR}
        </option>
        <option style={{ color: 'green', fontWeight: 'bold' }} value={LEVERERAD}>
          {LEVERERAD}
        </option>
        <option style={{ color: 'red', fontWeight: 'bold' }} value={MAKULERAD}>
          {MAKULERAD}
        </option>
      </Select>
    </FormControl>
  )
}

export default SetStatus
