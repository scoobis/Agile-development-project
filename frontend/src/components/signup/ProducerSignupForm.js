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
import FormField from '../FormField'

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
              <FormField
                name='name'
                label='Fullständigt namn'
                autoFocus
                value={name.value}
                onChange={handleChange}
                error={name.hasError}
                helperText={name.hasError && name.helperText}
                min={MIN_NAME_LENGTH}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name='email'
                label='E-post'
                value={email.value}
                onChange={handleChange}
                error={email.hasError}
                helperText={email.hasError && email.helperText}
                min={MIN_EMAIL_LENGTH}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name='phone'
                label='Telefonnummer'
                value={phone.value}
                onChange={handleChange}
                error={phone.hasError}
                helperText={phone.hasError && phone.helperText}
                min={PHONE_LENGTH}
                max={PHONE_LENGTH}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name='orgNumber'
                label='Organisationsnummer'
                value={orgNumber.value}
                onChange={handleChange}
                error={orgNumber.hasError}
                helperText={orgNumber.hasError && orgNumber.helperText}
                min={ORGNR_LENGTH}
                max={MAX_ORGNR_LENGTH}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                name='password'
                label='Lösenord'
                type='password'
                value={password.value}
                onChange={handleChange}
                error={password.hasError}
                helperText={password.hasError && email.helperText}
                min={MIN_PWD_LENGTH}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Adressuppgifter till er verksamhet</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormField
                name='streetAddress'
                label='Gatuadress'
                value={streetAddress.value}
                onChange={handleChange}
                error={streetAddress.hasError}
                helperText={streetAddress.hasError && streetAddress.helperText}
                min={MIN_ADDRESS_LENGTH}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                name='zip'
                label='Postnummer'
                value={zip.value}
                onChange={handleChange}
                error={zip.hasError}
                helperText={zip.hasError && zip.helperText}
                min={ZIPCODE_LENGTH}
                max={ZIPCODE_LENGTH}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                name='city'
                label='Ort'
                value={city.value}
                onChange={handleChange}
                error={city.hasError}
                helperText={city.hasError && city.helperText}
                min={MIN_CITY_LENGTH}
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
