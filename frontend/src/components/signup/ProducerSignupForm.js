import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Grid,
  Typography,
  FormControl
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidOrganizationNumber,
  isValidZipCode,
  isValidPhoneNumber,
  MIN_NAME_LENGTH,
  MIN_EMAIL_LENGTH,
  PHONE_LENGTH,
  ORGNR_LENGTH,
  MIN_PWD_LENGTH,
  MIN_ADDRESS_LENGTH,
  ZIPCODE_LENGTH,
  MIN_CITY_LENGTH,
  MAX_ORGNR_LENGTH
} from '../../utils/user'
import { signup } from '../../utils/api'
import { Producer } from '../../utils/roles'
import { LOGIN_PATH } from '../../utils/config'

const useStyles = makeStyles((theme) => ({
  paper: {
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

const ProducerSignupForm = () => {
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
      signup({
        name: name.value,
        email: email.value,
        password: password.value,
        role: Producer,
        orgNumber: orgNumber.value,
        phone: phone.value,
        streetAddress: streetAddress.value,
        zip: zip.value,
        city: city.value
      }).then((res) =>
        setNotice({
          message: res && res.data ? res.data.message : res && res.message ? res.message : '',
          isError: res && res.status !== 200
        })
      )
    }
  }

  const hasValidCredentials = () => !name.hasError && !email.hasError && !password.hasError && checked

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
                inputProps={{
                  minLength: MIN_NAME_LENGTH
                }}
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
                inputProps={{
                  minLength: MIN_EMAIL_LENGTH
                }}
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
                inputProps={{
                  minLength: PHONE_LENGTH,
                  maxLength: PHONE_LENGTH
                }}
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
                inputProps={{
                  minLength: ORGNR_LENGTH,
                  maxLength: MAX_ORGNR_LENGTH
                }}
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
                inputProps={{
                  minLength: MIN_PWD_LENGTH
                }}
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
                inputProps={{
                  minLength: MIN_ADDRESS_LENGTH
                }}
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
                inputProps={{
                  minLength: ZIPCODE_LENGTH,
                  maxLength: ZIPCODE_LENGTH
                }}
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
                inputProps={{
                  minLength: MIN_CITY_LENGTH
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required error={!checked}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={checked}
                      onChange={(e) => {
                        setChecked(e.target.checked)
                      }}
                      required
                    />
                  }
                  label={<Typography variant='body2'>Jag har läst och godkänner villkoren för producenter</Typography>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {notice.message && (
                <Typography color={notice.isError ? 'error' : 'secondary'}>{notice.message}</Typography>
              )}
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Registrera
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='body2'>
                Är du redan producent?{' '}
                <Link href={LOGIN_PATH}>
                  <a>Logga in</a>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default ProducerSignupForm
