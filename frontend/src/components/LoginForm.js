import React, { useState, useContext } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { login } from '../utils/api'
import { isValidEmail, isValidPassword } from '../utils/user'
import { AuthContext } from '../context/AuthContext'
import { setTokenCookie } from '../utils/auth-cookies'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function LoginForm () {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const { setAuthenticated } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const validEmail = isValidEmail(email)
    const validPassword = isValidPassword(password)

    if (!email && !password) {
      setMessage('Epost och lösenord är obligatoriskt')
    } else if (!email) {
      setMessage('E-post är obligatoriskt')
    } else if (!password) {
      setMessage('Lösenord är obligatoriskt')
    } else if (!validEmail && !validPassword) {
      setMessage('Ogiltig e-post och lösenord')
    } else if (!validEmail) {
      setMessage('Ogiltig e-post')
    } else if (!validPassword) {
      setMessage('Ogiltigt lösenord')
    } else {
      login({ email, password })
        .then(res => {
          if (res.token) {
            setTokenCookie(res.token)
            setAuthenticated(true)
            setMessage('Got token!')
          } else if (res.message) {
            setMessage(res.message)
          }
        })
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>Logga in</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='email'
                label='E-post'
                variant='outlined'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {message && (
                <Typography color='error'>
                  {message}
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
            Logga in
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='body2'>
              Inte kund? <Link href='/registrera'><a>Registrera konto</a></Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
