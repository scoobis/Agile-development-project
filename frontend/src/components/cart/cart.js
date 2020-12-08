import React, { useContext } from 'react'
import SummaryCard from './SummaryCard'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CartContext } from '../../context/CartContext'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import ProductTable from './ProductTable'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles({ test: { boxShadow: 'none' } })

const Cart = () => {
  const classes = useStyles()

  const { state, decrease, increase, removeProduct } = useContext(CartContext)

  console.log('state:', state.cartProducts)

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper} className={classes.test}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.cartProducts.length
                  ? state.cartProducts.map((product) => {
                      return <ProductTable product={product} increase={increase} decrease={decrease} removeProduct={removeProduct} key={product.id} />
                    })
                  : 'Varukorgen är tom!'}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <SummaryCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
