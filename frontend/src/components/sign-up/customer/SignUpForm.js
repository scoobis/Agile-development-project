import React, { useState } from 'react'
import { Button, TextField, FormControlLabel, Checkbox, Link, Container, Grid, Typography, FormControl, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isValidName, isValidEmail, isValidPassword } from '../../../helpers/user'
import { saveUser } from '../../../helpers/api'
import { Customer } from '../../../helpers/roles'

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
  const [checked, setChecked] = useState(false)
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    checked: false
  })

  const [notice, setNotice] = useState({ isError: false, message: '' })

  const { name, email, password } = inputs

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors({
      name: !isValidName(name),
      email: !isValidEmail(email),
      password: !isValidPassword(password),
      checked: !checked
    })

    if (hasValidCredentials()) {
      saveUser({ name, email, password, role: Customer })
        .then(result => result.error
          ? setNotice({ isError: true, message: result.error })
          : setNotice({ isError: false, message: result.message }))
    }
  }

  const hasValidCredentials = () =>
    isValidName(name) &&
    isValidEmail(email) &&
    isValidPassword(password) &&
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
            <Grid item xs={12} sm={6}>
              <TextField
                name='name'
                label='Fullständigt namn'
                variant='outlined'
                fullWidth
                autoFocus
                required
                value={name}
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
                value={email}
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
                value={password}
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
                      onChange={(e) => {
                        setChecked(e.target.checked)
                        setErrors({ ...errors, checked: !e.target.checked })
                      }}
                    />
                  }
                  label={<Typography variant='body2'>Jag har läst och godkänner köpvillkoren.'</Typography>}
                />
                {errors.checked && (
                  <FormHelperText>Villkoren måste godkännas.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {notice.message && (
                <Typography color={notice.isError && 'error'}>
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
              <Link href='#' variant='body2'>
                Är du redan kund? Logga in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
