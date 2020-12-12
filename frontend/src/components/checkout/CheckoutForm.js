import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { isValidName, isValidEmail, isValidZipCode, isValidPhoneNumber } from '../../utils/user'
import { Button, TextField, FormControlLabel, Checkbox, Container, Grid, Typography, FormControl, FormHelperText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const CheckoutForm = () => {
  const [state, setState] = useState({
    firstName: { value: '', hasError: false, helperText: '' },
    lastName: { value: '', hasError: false, helperText: '' },
    email: { value: '', hasError: false, helperText: '' },
    phone: { value: '', hasError: false, helperText: '' },
    streetAddress: { value: '', hasError: false, helperText: '' },
    zip: { value: '', hasError: false, helperText: '' },
    city: { value: '', hasError: false, helperText: '' }
  })
  const { firstName, lastName, email, streetAddress, zip, city, phone } = state

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setState({
      ...state,
      [name]: { ...state[name], value: value, hasError: false }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setState({
      ...state,
      firstName: { ...firstName, hasError: firstName.value.length < 3 },
      lastName: { ...firstName, hasError: lastName.value.length < 3 },
      email: { ...email, hasError: !isValidEmail(email.value) },
      phone: { ...phone, hasError: !isValidPhoneNumber(phone.value) },
      zip: { ...zip, hasError: !isValidZipCode(zip.value) }
    })

    // TODO: Submit form
  }

  const classes = useStyles()
  return (
    <Container component='main' maxWidth='lg' style={{ maxWidth: '750px' }}>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Din Information?
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='firstName'
                label='Förstnamn'
                variant='outlined'
                fullWidth
                autoFocus
                required
                value={firstName.value}
                onChange={handleChange}
                error={firstName.hasError}
                helperText={firstName.hasError && firstName.helperText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='lastName'
                label='Efternamn'
                variant='outlined'
                fullWidth
                autoFocus
                required
                value={lastName.value}
                onChange={handleChange}
                error={lastName.hasError}
                helperText={lastName.hasError && lastName.helperText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='email'
                label='E-post'
                variant='outlined'
                required
                fullWidth
                value={email.value}
                onChange={handleChange}
                error={email.hasError}
                helperText={email.hasError && email.helperText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='phone'
                label='Telefonnummer'
                variant='outlined'
                required
                fullWidth
                value={phone.value}
                onChange={handleChange}
                error={phone.hasError}
                helperText={phone.hasError && phone.helperText}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name='streetAddress'
                label='Gatuadress'
                variant='outlined'
                type='text'
                required
                fullWidth
                value={streetAddress.value}
                onChange={handleChange}
                error={streetAddress.hasError}
                helperText={streetAddress.hasError && streetAddress.helperText}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name='zip'
                label='Postnummer'
                variant='outlined'
                type='text'
                required
                fullWidth
                value={zip.value}
                onChange={handleChange}
                error={zip.hasError}
                helperText={zip.hasError && zip.helperText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='city'
                label='Ort'
                variant='outlined'
                type='text'
                required
                fullWidth
                value={city.value}
                onChange={handleChange}
                error={city.hasError && city.helperText}
              />
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} onClick={handleSubmit}>
              Slutför order
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default CheckoutForm
