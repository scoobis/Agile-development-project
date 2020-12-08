import React, { useContext, useEffect } from 'react'
import SummaryCard from './SummaryCard'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CartContext } from '../../context/CartContext'

import { Table, TableBody, TableContainer, Paper, TableCell, TableHead, TableRow } from '@material-ui/core'
import ProductTable from './ProductTable'

const useStyles = makeStyles({ test: { boxShadow: 'none' } })

const Cart = () => {
  const classes = useStyles()

  const { decrease, increase, removeProduct, state } = useContext(CartContext)

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
