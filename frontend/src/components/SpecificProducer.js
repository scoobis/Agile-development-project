import React from 'react'
import { Grid, Typography, Box, Paper, makeStyles } from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'
import ContactForm from './ContactForm'

const useStyles = makeStyles({
  link: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    fontSize: 16,
    '& > *': {
      margin: 5
    },
    '&:hover': {
      color: '#dddddd'
    }
  },
  contactArea: {
    backgroundColor: '#453c37',
    '& > *': {
      color: '#fff'
    }
  },
  addressArea: {
    backgroundColor: '#453c371a'
  },
  bold: {
    fontWeight: 700
  }
})

const SpecificProducer = ({ producer }) => {
  const classes = useStyles()
  const getFullAddress = () => `${producer.street} ${producer.zip} ${producer.city}`

  return (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <Paper square>
          <img
            src='https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?fit=crop&w=960&q=80&h=350'
            width='100%'
          />
          <Box p={5}>
            <Typography gutterBottom>
              {producer.description}
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
              <br />
              <br />
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </Typography>
          </Box>
          <Box p={5}>
            <Typography gutterBottom variant='h3' component='h3'>
              Kontakta oss
            </Typography>
            <ContactForm sendTo={producer.email} />
          </Box>
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Box pb={3}>
          <Paper square className={classes.contactArea}>
            <Box p={3}>
              <Typography className={classes.bold} gutterBottom variant='h3' component='h3'>
                Kontakt
              </Typography>
              <a className={classes.link} href={`tel:${producer.phone}`}>
                <PhoneIcon />
                {producer.phone}
              </a>
              <a className={classes.link} href={`mailto:${producer.email}`}>
                <MailIcon />
                {producer.email}
              </a>
            </Box>
          </Paper>
        </Box>
        <Box pb={3}>
          <Paper square className={classes.addressArea}>
            <Box p={3}>
              <Typography className={classes.bold} gutterBottom variant='h3' component='h3'>
                Adress
              </Typography>
              <Typography>
                {producer.street}
                <br />
                {producer.zip} {producer.city}
              </Typography>
              <Typography>
                <a
                  href={`http://maps.google.com/maps?q=${encodeURIComponent(getFullAddress())}`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Vägbeskrivning (Google Maps)
                </a>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SpecificProducer
