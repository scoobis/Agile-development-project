import React from 'react'
import PickAmount from '../products/PickAmount'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, TableRow } from '@material-ui/core'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  img: { width: '90px', border: '1px solid grey' },
  bold: { fontWeight: 'bold' },
  name: { fontWeight: 'bold', fontSize: '16px' },
})

const ProductTable = (props) => {
  const classes = useStyles()
  const handleAmountChange = (value) => 5

  const { name, quantity, price } = props.product

  return (
    <StyledTableRow>
      <TableCell align='center'>
        <img src='/apples.jpg' className={classes.img} />
      </TableCell>
      <TableCell align='left' className={classes.name}>
        {name}
      </TableCell>
      <TableCell>
        <PickAmount inStock={25} handleAmountChange={handleAmountChange} initialValue={quantity} /> {/*TODO: Set inStock */}
      </TableCell>
      <TableCell align='right' className={classes.bold}>
        {price * quantity}.00 SEK
      </TableCell>
      <TableCell>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </StyledTableRow>
  )
}

export default ProductTable
