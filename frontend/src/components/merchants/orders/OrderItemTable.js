import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles, TableCell, TableRow } from '@material-ui/core'
import SetStatus from './SetStatus'

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

const OrderItemTable = (props) => {
  const classes = useStyles()

  const { order, setOrderDetialsComponent } = props

  const [activeDetials, setActiveDetails] = useState(false)

  const openOrderDetails = () => {
    activeDetials ? setOrderDetialsComponent({ order: {}, isActive: false }) : setOrderDetialsComponent({ order, isActive: true })
    setActiveDetails(!activeDetials)
  }

  // TODO: order status fix
  return (
    <StyledTableRow>
      <TableCell component='th' scope='row'>
        {order.customerName}
      </TableCell>
      <TableCell align='right'>{order.customerEmail}</TableCell>
      <TableCell align='right'>Hämtas på plats</TableCell>
      <TableCell align='right'>{order.total} SEK</TableCell>
      <TableCell align='right'>
        <SetStatus status={'aktiv'} />
      </TableCell>
      <TableCell align='right' style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => openOrderDetails()}>
        {!activeDetials ? 'Öppna' : 'Stäng'}
      </TableCell>
    </StyledTableRow>
  )
}

export default OrderItemTable
