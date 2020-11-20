import React, { useState } from 'react'
import Link from 'next/link'
import { Button, TextField, FormControlLabel, Checkbox, Container, Grid, Typography, FormControl, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isValidName, isValidEmail, isValidPassword, isValidOrganizationNumber, isValidZipCode, isValidPhoneNumber } from '../../utils/user'
import { saveUser } from '../../utils/api'
import { Producer } from '../../utils/roles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

export default function ProducerSignupForm () {
  const [state, setState] = useState({
    name: { value: '', hasError: false, helperText: '' },
    email: { value: '', hasError: false, helperText: '' },
    phone: { value: '', hasError: false, helperText: '' },
    password: { value: '', hasError: false, helperText: '' },
    orgNumber: { value: '', hasError: false, helperText: '' },
    streetAddress: { value: '', hasError: false, helperText: '' },
    zip: { value: '', hasError: false, helperText: '' },
    city: { value: '', hasError: false, helperText: '' }
  })

  const [checked, setChecked] = useState(false)
  const [notice, setNotice] = useState({ isError: false, message: '' })

  const { name, email, password, orgNumber, streetAddress, zip, city, phone } = state

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
      name: { ...name, hasError: !isValidName(name.value) },
      email: { ...email, hasError: !isValidEmail(email.value) },
      phone: { ...phone, hasError: !isValidPhoneNumber(phone.value) },
      password: { ...password, hasError: !isValidPassword(password.value) },
      orgNumber: { ...orgNumber, hasError: !isValidOrganizationNumber(orgNumber.value) },
      zip: { ...zip, hasError: !isValidZipCode(zip.value) }
    })

    if (hasValidCredentials()) {
      saveUser({
        name: name.value,
        email: email.value,
        password: password.value,
        role: Producer,
        orgNumber: orgNumber.value,
        streetAddress: streetAddress.value,
        zip: zip.value,
        city: city.value
      })
        .then(res => setNotice({
          message: res && res.data ? res.data.message : res && res.message ? res.message : '',
          isError: res && res.status !== 200
        }))
    }
  }

  const hasValidCredentials = () =>
    !name.hasError &&
    !email.hasError &&
    !password.hasError &&
    checked

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
           Registrera dig som producent
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='name'
                label='Fullständigt namn'
                variant='outlined'
                fullWidth
                autoFocus
                required
                value={name.value}
                onChange={handleChange}
                error={name.hasError}
                helperText={name.hasError && name.helperText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='email'
                label='E-post'
                variant='outlined'
                required
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
                value={phone.value}
                onChange={handleChange}
                error={phone.hasError}
                helperText={phone.hasError && phone.helperText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='orgNumber'
                label='Organisationsnummer'
                variant='outlined'
                type='text'
                required
                fullWidth
                value={orgNumber.value}
                onChange={handleChange}
                error={orgNumber.hasError}
                helperText={orgNumber.hasError && orgNumber.helperText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='password'
                label='Lösenord'
                variant='outlined'
                type='password'
                required
                fullWidth
                value={password.value}
                onChange={handleChange}
                error={password.hasError}
                helperText={password.hasError && email.helperText}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Adressuppgifter till er verksamhet</Typography>
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
            <Grid item xs={12}>
              <FormControl required error={!checked}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={checked}
                      onChange={(e) => { setChecked(e.target.checked) }}
                    />
                  }
                  label={<Typography variant='body2'>Jag har läst och godkänner villkoren för producenter</Typography>}
                />
                {!checked && (
                  <FormHelperText>Obligatoriskt</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {notice.message && (
                <Typography color={notice.isError ? 'error' : 'secondary'}>
                  {notice.message}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            Registrera
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='body2'>
              Är du redan producent? <Link href='#'><a>Logga in</a></Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
