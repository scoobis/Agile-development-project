import { Button, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'

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
          <TextField
            name='name'
            label='Namn'
            placeholder='Namn'
            variant='outlined'
            value={state.name}
            required
            inputProps={{
              minLength: 2,
              maxLength: 50
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            name='email'
            label='E-post'
            placeholder='E-post'
            variant='outlined'
            value={state.email}
            required
            inputProps={{
              minLength: 3,
              maxLength: 100
            }}
            type='email'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='message'
            label='Meddelande'
            placeholder='Meddelande'
            variant='outlined'
            value={state.message}
            required
            inputProps={{
              minLength: 3,
              maxLength: 500
            }}
            multiline
            rows={4}
            fullWidth
          />
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
