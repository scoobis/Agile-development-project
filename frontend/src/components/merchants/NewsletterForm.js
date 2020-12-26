import { Button, Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import FormField from '../FormField'
import { sendEmail } from '../../utils/api'

const initialState = {
  subject: '',
  message: ''
}

const NewsletterForm = () => {
  const [state, setState] = useState(initialState)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (e) => {
    setShowConfirmModal(false)

    const name = e.target.name
    const value = e.target.value

    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  const sendNewsletter = () => {
    setShowConfirmModal(false)
    sendEmail({ ...state }).then(({ data, error }) => {
      if (data) {
        enqueueSnackbar('Nyhetsbrev skickat', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        })
        setState(initialState)
      } else {
        enqueueSnackbar(`Något gick fel: ${error}`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          }
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Meddela era kunder om nyheter, erbjudanden etc. <br /> Nyhetsbrevet skickas till samtliga av era kunder som
            tackat ja till att få nyhetsbrev från er.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormField name='subject' label='Ämne' min={3} max={100} value={state.subject} />
        </Grid>
        <Grid item xs={12}>
          <FormField name='message' label='Innehåll' min={10} max={500} multiline rows={12} value={state.message} />
        </Grid>
        <Button type='submit' variant='contained' color='primary'>
          Skicka
        </Button>
        {showConfirmModal && (
          <ConfirmModal
            title='Bekräfta utskick'
            content='Vill du skicka nyhetsbrevet till samtliga av dina prenumeranter? Den här åtgärden går inte att ångra.'
            isConfirmed={(shouldSend) => (shouldSend ? sendNewsletter() : setShowConfirmModal(false))}
          />
        )}
      </Grid>
    </form>
  )
}

export default NewsletterForm
