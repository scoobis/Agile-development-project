import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { newOrder } from '../../utils/api'
import { useRouter } from 'next/router'
import {
  isValidName,
  isValidEmail,
  isValidZipCode,
  isValidPhoneNumber,
  MIN_CITY_LENGTH,
  ZIPCODE_LENGTH,
  MIN_ADDRESS_LENGTH,
  PHONE_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_NAME_LENGTH
} from '../../utils/user'
import { Button, Container, Grid, Typography, Checkbox, FormControlLabel } from '@material-ui/core'
import FormField from '../FormField'

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

const CheckoutForm = (props) => {
  const { cartContext, setPaid } = props
  const router = useRouter()

  const [subscribe, setSubscribe] = useState(false)
  const [state, setState] = useState({
    name: { value: '', hasError: false, helperText: '' },
    email: { value: '', hasError: false, helperText: '' },
    phone: { value: '', hasError: false, helperText: '' },
    streetAddress: { value: '', hasError: false, helperText: '' },
    zip: { value: '', hasError: false, helperText: '' },
    city: { value: '', hasError: false, helperText: '' }
  })
  const { name, email, streetAddress, zip, city, phone } = state

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
      zip: { ...zip, hasError: !isValidZipCode(zip.value) }
    })

    // Backend wants productId instead of id on products
    cartContext.cartProducts = cartContext.cartProducts.map((product) => {
      const { id: productId } = product
      delete product.id
      return { productId, ...product }
    })
    newOrder({
      orgNumber: cartContext.cartProducts[0].orgNumber, // take orgNumber from first product, since all should be from the same producer
      customerName: state.name.value,
      customerEmail: state.email.value,
      customerPhone: state.phone.value,
      customerStreetAddress: state.streetAddress.value,
      customerZip: state.zip.value,
      customerCity: state.city.value,
      products: cartContext.cartProducts,
      subscribe: subscribe,
      shippingMethod: 'collect', // Only option atm
      paymentMethod: 'upon_collect', // only option atm
      subtotal: cartContext.total, // TODO: calc subTotal (not required atm?)
      shipping: '0', // no shipping required atm
      discount: '0', // TODO: what is the intention
      total: cartContext.total
    }).then((res) => {
      if (res.status === 200) {
        setPaid()
        router.push('/tack-for-din-order')
      }
    })
  }

  const classes = useStyles()
  return (
    <Container component='main' maxWidth='lg' style={{ maxWidth: '750px' }}>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Din information
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                name='streetAddress'
                label='Gatuadress'
                value={streetAddress.value}
                onChange={handleChange}
                error={streetAddress.hasError}
                helperText={streetAddress.hasError && streetAddress.helperText}
                min={MIN_ADDRESS_LENGTH}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
              <FormControlLabel
                control={<Checkbox checked={subscribe} onChange={() => setSubscribe(!subscribe)} name='subscribe' />}
                label='Ja, jag vill ta del av nyheter och erbjudanden från producenten'
              />
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Slutför order
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default CheckoutForm
