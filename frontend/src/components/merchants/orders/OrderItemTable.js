import React, { useState } from 'react'
import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

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

const OrderItemTable = (order) => {
  const classes = useStyles()

  order = order.order // why does it become order.order?...

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
      <TableCell align='right'>
        <IconButton onClick={() => setAction(ACTIONS.EDIT_PRODUCT)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setAction(ACTIONS.REMOVE_PRODUCT)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </StyledTableRow>
  )
}

export default OrderItemTable
