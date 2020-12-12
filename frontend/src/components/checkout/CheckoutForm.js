import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, FormControlLabel, Checkbox, Container, Grid, Typography, FormControl, FormHelperText } from '@material-ui/core'

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

const CheckoutForm = () => {
  const handleSubmit = () => {}
  const handleChange = () => {}

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
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default CheckoutForm
