import React from 'react'
import { editProduct } from '../../../utils/api'
import ProductForm from '../ProductForm'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogContent: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(1)
  }
}))

export default function EditProductForm ({ product, onClose }) {
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const handleEditProduct = (toEdit) => editProduct({ ...toEdit, id: product.id })

  return (
    <Dialog onClose={handleClose} aria-labelledby='edit-product' open={open}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography>Redigera {product.name}</Typography>
        {open && (
          <IconButton aria-label='close' className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <ProductForm preFilled={product} onSubmit={handleEditProduct} />
      </DialogContent>
    </Dialog>
  )
}
