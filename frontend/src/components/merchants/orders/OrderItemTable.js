import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const useStyles = makeStyles({
  thumbnail: {
    maxHeight: 50
  },
  active: { color: 'green', fontWeight: 'bold' },
  notActive: { color: 'red', fontWeight: 'bold' }
})

const OrderItemTable = (order, setOrderDetialsComponent) => {
  const classes = useStyles()

  order = order.order // why does it become order.order?...
  const test = () => {
    console.log(setOrderDetialsComponent)
    setOrderDetialsComponent('active')
  }

  return (
    <StyledTableRow>
      <TableCell component='th' scope='row'>
        {order.customerName}
      </TableCell>
      <TableCell align='right'>{order.customerEmail}</TableCell>
      <TableCell align='right'>Hämtas på plats</TableCell>
      <TableCell align='right'>{order.fees.total} SEK</TableCell>
      <TableCell align='right' className={order.status === 'aktiv' ? classes.active : classes.notActive}>
        {order.status}
      </TableCell>
      <TableCell align='right' style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={test()}>
        Mer info
      </TableCell>
      <TableCell align='right'>
        <IconButton onClick={() => setAction(ACTIONS.EDIT_PRODUCT)}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => setAction(ACTIONS.REMOVE_PRODUCT)}>
          <ClearIcon />
        </IconButton>
      </TableCell>
    </StyledTableRow>
  )
}

export default OrderItemTable
