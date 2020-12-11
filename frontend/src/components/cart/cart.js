import React, { useContext } from 'react'
import SummaryCard from './SummaryCard'
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Link,
  Box
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CartContext } from '../../context/CartContext'

import ProductTable from './ProductTable'

const useStyles = makeStyles({ test: { boxShadow: 'none' } })

const Cart = () => {
  const classes = useStyles()

  const { decrease, increase, removeProduct, state } = useContext(CartContext)

  return (
    <Container>
      <Grid container spacing={2}>
        {state.cartProducts.length ? (
          <>
            <Grid item xs={8}>
              <TableContainer component={Paper} className={classes.test}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.cartProducts.map((product) => (
                      <ProductTable product={product} increase={increase} decrease={decrease} removeProduct={removeProduct} key={product.id} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={4}>
              <SummaryCard total={state.total} />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Box textAlign='center'>
              <Box pb={1}>
                <Typography>Din varukorg är tom</Typography>
              </Box>
              <Button variant='contained' color='primary'>
                <Link href='/produkter'>
                  <a style={{ color: '#fff' }}>Börja handla</a>
                </Link>
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Cart
