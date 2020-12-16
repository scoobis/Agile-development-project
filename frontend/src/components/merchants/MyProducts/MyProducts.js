import React, { useState, useEffect } from 'react'
import { getProductsByProducer, removeProduct } from '../../../utils/api'
import useAuth from '../../../utils/useAuth'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ProductTableItem from './ProductTableItem'
import { Typography } from '@material-ui/core'
import { replaceNullsWithEmptyStr } from '../../../utils/helpers'

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

const MyProducts = () => {
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () =>
    getProductsByProducer(user.user.orgNumber).then((response) => {
      if (response.status === 200) {
        setProducts(response.data.map(replaceNullsWithEmptyStr))
      } else {
        // setProducts([])
      }
    })

  const handleRemoveProduct = (id) => {
    removeProduct(id)
      .then((response) => response.success && setProducts(products.filter((product) => product.id !== id)))
      .catch(console.log)
  }

  return products.length ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <StyledTableCell>Namn</StyledTableCell>
            <StyledTableCell align='right'>Pris</StyledTableCell>
            <StyledTableCell align='right'>Rabatterat pris</StyledTableCell>
            <StyledTableCell align='right'>Enhet</StyledTableCell>
            <StyledTableCell align='right'>Antal i lager</StyledTableCell>
            <StyledTableCell align='right'>Kategorier</StyledTableCell>
            <StyledTableCell align='right'>Tumnagel</StyledTableCell>
            <StyledTableCell align='right' />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductTableItem key={product.id} product={product} onEdit={getProducts} onRemove={handleRemoveProduct} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Inga produkter hittades</Typography>
  )
}

export default MyProducts
