import React, { useState } from 'react'
import { Button, TextField, FormControlLabel, Checkbox, Link, Container, Grid, Typography, FormControl, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from '../../../helpers/axios-wrapper'

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

export default function SignUpForm () {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    checked: false
  })

  const [checked, setChecked] = useState(false)

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const hasValidName = isValidName()
    const hasValidEmail = isValidEmail()
    const hasValidPassword = isValidPassword()

    setErrors({
      name: !hasValidName,
      email: !hasValidEmail,
      password: !hasValidPassword,
      checked: !checked
    })

    if (hasValidName && hasValidEmail && hasValidPassword && checked) {
      axios.post('/users', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        role: 'Producer'
      })
    }
  }

  const isValidName = () => inputs.name.length >= 3

  const isValidEmail = () => /\S+@\S+\.\S+/.test(inputs.email)

  const isValidPassword = () => inputs.password.length >= 6

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Registrera dig som producent
        </Typography>

        <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='name'
                label='Fullständigt namn'
                variant='outlined'
                fullWidth
                autoFocus
                required
                value={inputs.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name && 'Ogiltigt namn'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='email'
                label='E-post'
                variant='outlined'
                required
                value={inputs.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email && 'Ogiltig e-post'}
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
                value={inputs.password}
                onChange={handleChange}
                error={errors.password}
                helperText={errors.password && 'Lösenordet är för svagt'}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required error={!checked}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  }
                  label='Jag har läst och godkänner villkoren för producenter och intygar att jag är en faktisk producent.'
                />
                {errors.checked && (
                  <FormHelperText>Villkoren måste godkännas.</FormHelperText>
                )}
              </FormControl>
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
              <Link href='#' variant='body2'>
                Är du redan producent? Logga in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
    </Container>
  )
}
