import React, { useState, useEffect } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import OrderItemTable from './OrderItemTable'
import OrderDetials from './OrderDetails'
import { getOrdersProducer } from '../../../utils/api'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
})

const Orders = () => {
  const classes = useStyles()

  const [orders, setOrders] = useState([])

  const [orderDetialsComponent, setOrderDetialsComponent] = useState({ order: {}, isActive: false })

  const renderOrderDetials = (order) => {
    if (orderDetialsComponent.isActive) {
      return <OrderDetials order={order} />
    }
  }

  useEffect(() => {
    getOrdersProducer().then((response) => {
      setOrders(response)
    })
  }, [])

  console.log(orders)

  return orders.length ? (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <StyledTableCell>Kund namn</StyledTableCell>
              <StyledTableCell align='right'>Email</StyledTableCell>
              <StyledTableCell align='right'>Frakt</StyledTableCell>
              <StyledTableCell align='right'>Total belopp</StyledTableCell>
              <StyledTableCell align='right'>Status</StyledTableCell>
              <StyledTableCell align='right'>Mer info</StyledTableCell>
              <StyledTableCell align='right' />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderItemTable key={order.id} order={order} setOrderDetialsComponent={setOrderDetialsComponent} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {orderDetialsComponent && renderOrderDetials(orderDetialsComponent.order)}
    </div>
  ) : (
    <Typography>Inga aktuella ordrar hittades</Typography>
  )
}

export default Orders
