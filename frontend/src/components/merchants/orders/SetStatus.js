import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LEVERERAD, INKOMMEN, MAKULERAD, LERVERANSKLAR } from '../../../utils/config'
import { updateOrderStatus } from '../../../utils/api'
import { useSnackbar } from 'notistack'

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
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  const handleChange = (e) => {
    const { value: status } = e.target
    setCurrentStatus(status)
    status !== ''
      ? updateOrderStatus({ status, id: 1 }).then((res) => {
          if (res.status === 200) {
            enqueueSnackbar(` Status har uppdaterats till: ${status}`, {
              variant: 'success',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
              }
            })
          } else {
            enqueueSnackbar('Ops, något gick fel. Försök igen senare...', {
              variant: 'error',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
              }
            })
          }
        })
      : '' // Do Nothing
  }
  useEffect(() => {
    if (currentStatus === INKOMMEN) setColor('green')
    else if (currentStatus === LERVERANSKLAR) setColor('orange')
    else if (currentStatus === LEVERERAD) setColor('black')
    else if (currentStatus === MAKULERAD) setColor('red')
  }, [currentStatus])

  return (
    <FormControl className={classes.formControl}>
      <Select style={{ color: color, fontWeight: 'bold' }} value={currentStatus} native onChange={handleChange}>
        <option aria-label='none' value='' />
        <option style={{ color: 'green', fontWeight: 'bold' }} value={INKOMMEN}>
          {INKOMMEN}
        </option>
        <option style={{ color: 'orange', fontWeight: 'bold' }} value={LERVERANSKLAR}>
          {LERVERANSKLAR}
        </option>
        <option style={{ color: 'black', fontWeight: 'bold' }} value={LEVERERAD}>
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
