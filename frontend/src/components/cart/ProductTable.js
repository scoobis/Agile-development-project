import React from 'react'
import PickAmountCart from './PickAmountCart'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, TableRow } from '@material-ui/core'
import Link from 'next/link'
import { CURRENCY, PRODUCTS_PATH, PRODUCT_PLACEHOLDER_IMG_PATH } from '../../utils/config'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white'
    }
  }
}))(TableRow)

const useStyles = makeStyles({
  img: { width: '90px', border: '1px solid grey' },
  bold: { fontWeight: 'bold' },
  name: { fontWeight: 'bold', fontSize: '16px' }
})

const ProductTable = (props) => {
  const classes = useStyles()

  const { name, quantity, price, id } = props.product

  const { increase, decrease, removeProduct } = props

  return (
    <StyledTableRow>
      <TableCell align='center'>
        <img src={PRODUCT_PLACEHOLDER_IMG_PATH} className={classes.img} />
      </TableCell>
      <TableCell align='left' className={classes.name}>
        <Link href={`${PRODUCTS_PATH}/${id}`}>
          <a>{name}</a>
        </Link>
      </TableCell>
      <TableCell>
        <PickAmountCart inStock={25} increase={increase} decrease={decrease} initialValue={quantity} id={id} />{' '}
        {/* TODO: Set inStock */}
      </TableCell>
      <TableCell align='right' className={classes.bold}>
        {price * quantity} {CURRENCY}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => removeProduct({ id })}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </StyledTableRow>
  )
}

export default ProductTable
