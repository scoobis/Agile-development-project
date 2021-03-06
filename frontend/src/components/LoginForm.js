import React, { useState, useContext } from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { isValidEmail, isValidPassword, MIN_EMAIL_LENGTH, MIN_PWD_LENGTH } from '../utils/user'
import { AuthContext } from '../context/AuthContext'
import { REGISTER_CUSTOMER_PATH } from '../utils/config'
import FormField from './FormField'

const useStyles = makeStyles((theme) => ({
  paper: {
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

const LoginForm = () => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const { authenticate } = useContext(AuthContext)

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
      authenticate({ email, password }).then((response) => {
        response.status !== 200 && setMessage(response.data.message)
      })
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Logga in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} onChange={() => setMessage('')}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormField
                name='email'
                label='Epost'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                min={MIN_EMAIL_LENGTH}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                min={MIN_PWD_LENGTH}
              />
            </Grid>
            <Grid item xs={12}>
              {message && <Typography color='error'>{message}</Typography>}
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Logga in
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='body2'>
                Inte kund?{' '}
                <Link href={REGISTER_CUSTOMER_PATH}>
                  <a>Registrera konto</a>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
