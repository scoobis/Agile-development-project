import React, { useState } from 'react'
import Link from 'next/link'
import { Button, TextField, FormControlLabel, Checkbox, Container, Grid, Typography, FormControl, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isValidName, isValidEmail, isValidPassword } from '../../utils/user'
import { saveUser } from '../../utils/api'
import { Customer } from '../../utils/roles'

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
    password: { value: '', hasError: false, helperText: '' }
  })

  const [checked, setChecked] = useState(false)
  const [notice, setNotice] = useState({ isError: false, message: '' })

  const { name, email, password } = state

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
      password: { ...password, hasError: !isValidPassword(password.value) }
    })

    if (hasValidCredentials()) {
      saveUser({
        name: name.value,
        email: email.value,
        password: password.value,
        role: Customer
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
           Registrera kundkonto
        </Typography>
        <Typography>
           När du registrerar ett konto får du ta del av fördelar som att kunna spara din adress, se orderhistorik etc.
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
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
              Är du redan kund? <Link href='#'><a>Logga in</a></Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
