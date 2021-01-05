import React, { useEffect, useState } from 'react'
import PickAmountCart from './PickAmountCart'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, TableRow, Typography } from '@material-ui/core'
import Link from 'next/link'
import { getOneProduct } from '../../utils/api'
import { CURRENCY, PRODUCTS_PATH, PRODUCT_PLACEHOLDER_IMG_PATH } from '../../utils/config'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white'
    }
  }
}))(TableRow)

const useStyles = makeStyles({
  img: { width: 90, border: '1px solid grey' },
  bold: { fontWeight: 'bold' },
  name: { fontWeight: 'bold', fontSize: 16 },
  oldPrice: { textDecoration: 'line-through', fontSize: 13 },
  salePrice: { color: 'red', marginLeft: 10 }
})

const ProductTable = (props) => {
  const classes = useStyles()

  const { name, quantity, price, salePrice, id, image } = props.product
  const { increase, decrease, removeProduct } = props
  const [availability, setAvailability] = useState(0)

  useEffect(() => {
    getOneProduct(id).then(({ data }) => data && setAvailability(data.inStock))
  }, [])

  return (
    <StyledTableRow>
      <TableCell align='center'>
        <img src={image || PRODUCT_PLACEHOLDER_IMG_PATH} className={classes.img} />
      </TableCell>
      <TableCell align='left' className={classes.name}>
        <Link href={`${PRODUCTS_PATH}/${id}`}>
          <a>{name}</a>
        </Link>
      </TableCell>
      <TableCell>
        <PickAmountCart
          inStock={availability}
          increase={increase}
          decrease={decrease}
          initialValue={quantity}
          id={id}
        />{' '}
      </TableCell>
      <TableCell align='right' className={classes.bold}>
        <Typography display='inline' className={`${classes.bold} ${salePrice && classes.oldPrice}`}>
          {price} {CURRENCY}
        </Typography>
        {salePrice && (
          <Typography display='inline' className={` ${classes.bold} ${classes.salePrice} `}>
            {salePrice} {CURRENCY}
          </Typography>
        )}
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
