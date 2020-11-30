import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ConfirmRemovalModal ({ title, content, isConfirmed }) {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    isConfirmed(false)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
            Nej
        </Button>
        <Button
          onClick={() => {
            setOpen(false)
            isConfirmed(true)
          }} color='primary' autoFocus
        >
            Ja
        </Button>
      </DialogActions>
    </Dialog>
  )
}
