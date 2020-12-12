import React, { useState } from 'react'
import Link from 'next/link'
import EditProductForm from './EditProductForm'
import ConfirmModal from '../../ConfirmModal'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { API_URL } from '../../../utils/config'

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
  }
})

const ACTIONS = {
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT'
}

const getFirstImageURL = (images) => {
  if (images.length) {
    return `${API_URL}/static/${images[0].image_name}`
  }

  return '/apples.jpg'
}

function ProductTableItem ({ product, onEdit, onRemove }) {
  const [action, setAction] = useState('')
  const classes = useStyles()

  return (
    <StyledTableRow>
      <TableCell component='th' scope='row'>
        <Link href={`/produkter/${product.id}`}>
          <a>{product.name}</a>
        </Link>
      </TableCell>
      <TableCell align='right'>{product.price} kr</TableCell>
      <TableCell align='right'>{product.salePrice || ''}</TableCell>
      <TableCell align='right'>{product.unit}</TableCell>
      <TableCell align='right'>
        {product.inStock} {product.unit}
      </TableCell>
      <TableCell align='right'>
        {product.categories.map((category) => <div key={category.name}> {category.name} </div>) || ''}
      </TableCell>
      <TableCell align='right'>
        <img className={classes.thumbnail} src={getFirstImageURL(product.images)} />
      </TableCell>
      <TableCell align='right'>
        <IconButton onClick={() => setAction(ACTIONS.EDIT_PRODUCT)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setAction(ACTIONS.REMOVE_PRODUCT)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
      {action === ACTIONS.EDIT_PRODUCT ? (
        <EditProductForm
          product={product}
          onClose={() => {
            setAction('')
            onEdit()
          }}
        />
      ) : (
        action === ACTIONS.REMOVE_PRODUCT && (
          <ConfirmModal
            title={`Vill du ta bort ${product.name}?`}
            content='Den här åtgärden går inte att ångra.'
            name={product.name}
            isConfirmed={(shouldRemove) => (shouldRemove ? onRemove(product.id) : setAction(''))}
          />
        )
      )}
    </StyledTableRow>
  )
}

export default ProductTableItem
