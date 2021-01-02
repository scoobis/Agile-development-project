import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { sendEmailTo } from '../utils/api'
import FormField from './FormField'
import { useSnackbar } from 'notistack'

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

const ContactForm = ({ sendTo }) => {
  const [state, setState] = useState(initialState)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      sender: state.email,
      recipient: sendTo,
      subject: state.subject,
      message: state.message
    }

    sendEmailTo(data).then(({ data, error }) => {
      if (data) {
        enqueueSnackbar('Meddelandet har skickats', {
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

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setState({ ...state, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <FormField name='name' label='Namn' value={state.name} min={2} max={50} />
        </Grid>
        <Grid item md={6}>
          <FormField name='email' label='E-post' value={state.email} min={3} max={100} type='email' />
        </Grid>
        <Grid item md={12}>
          <FormField name='subject' label='Ämne' value={state.subject} min={3} max={100} />
        </Grid>
        <Grid item xs={12}>
          <FormField name='message' label='Meddelande' value={state.message} min={3} max={500} multiline rows={4} />
        </Grid>
        <div className='buttonContainer'>
          <Button variant='contained' type='submit' color='primary' disableElevation>
            Skicka
          </Button>
        </div>
      </Grid>
    </form>
  )
}

export default ContactForm
