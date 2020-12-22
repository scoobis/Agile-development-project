import { Box, Button, Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import CheckIcon from '@material-ui/icons/Check'
import FormField from '../FormField'

const initialState = {
  subject: '',
  body: ''
}

const NewsletterForm = () => {
  const [state, setState] = useState(initialState)
  const [userWantsToSubmit, setUserWantsToSubmit] = useState(false)
  const [isSubmitConfirmed, setSubmitConfirmed] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (e) => {
    setUserWantsToSubmit(false)
    setSubmitConfirmed(false)

    const name = e.target.name
    const value = e.target.value

    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserWantsToSubmit(true)
  }

  const sendNewsletter = () => {
    setUserWantsToSubmit(false)
    setSubmitConfirmed(true)
    enqueueSnackbar('Nyhetsbrev skickat', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    })
    setState(initialState)
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
          <FormField name='subject' label='Ämne' min={3} max={100} required fullWidth value={state.subject} />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name='body'
            label='Innehåll'
            min={10}
            max={500}
            required
            fullWidth
            multiline
            rows={12}
            value={state.body}
          />
        </Grid>
        <Grid item xs={12}>
          {isSubmitConfirmed && (
            <Box alignItems='center' display='flex' color='success'>
              <CheckIcon style={{ marginRight: '5px' }} />
              <Typography>Skickat</Typography>
            </Box>
          )}
        </Grid>
        <Button type='submit' variant='contained' color='primary'>
          Skicka
        </Button>
        {userWantsToSubmit && (
          <ConfirmModal
            title='Bekräfta utskick'
            content='Vill du skicka nyhetsbrevet till samtliga av dina prenumeranter? Den här åtgärden går inte att ångra.'
            isConfirmed={(shouldSend) => (shouldSend ? sendNewsletter() : setUserWantsToSubmit(false))}
          />
        )}
      </Grid>
    </form>
  )
}

export default NewsletterForm
