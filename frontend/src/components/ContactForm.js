import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import FormField from './FormField'

const initialState = {
  name: '',
  email: '',
  message: ''
}

const ContactForm = ({ sendTo }) => {
  const [state, setState] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    setState(initialState)
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
