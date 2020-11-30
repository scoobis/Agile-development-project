import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  thumbnail: {
    maxHeight: 50
  }
})

export default function MyProducts ({ products }) {
  console.log(products)
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Namn</StyledTableCell>
            <StyledTableCell align='right'>Pris</StyledTableCell>
            <StyledTableCell align='right'>Rabatterat pris</StyledTableCell>
            <StyledTableCell align='right'>Enhet</StyledTableCell>
            <StyledTableCell align='right'>Antal i lager</StyledTableCell>
            <StyledTableCell align='right'>Kategorier</StyledTableCell>
            <StyledTableCell align='right'>Tumnagel</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell component='th' scope='row'>
                {product.name}
              </StyledTableCell>
              <StyledTableCell align='right'>{product.price} kr</StyledTableCell>
              <StyledTableCell align='right'>{product.salePrice || ''}</StyledTableCell>
              <StyledTableCell align='right'>{product.unit}</StyledTableCell>
              <StyledTableCell align='right'>{product.in_stock} st</StyledTableCell>
              <StyledTableCell align='right'>{product.categories || ''}</StyledTableCell>
              <StyledTableCell align='right'>
                <img className={classes.thumbnail} src={product.thumbnail || '/apples.jpg'} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
