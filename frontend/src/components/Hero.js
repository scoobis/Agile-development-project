import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import { Button, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  heroContent: {
    position: 'relative',
    textAlign: 'center',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  },
  heroTitle: {
    fontWeight: '700'
  },
  button: {
    backgroundColor: '#81b23e',
    borderRadius: '30px',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),
    '& *': {
      textDecoration: 'none',
      color: theme.palette.common.black
    }
  }
}))

export default function Hero ({ content }) {
  const classes = useStyles()

  return (
    <Paper className={classes.hero} style={{ backgroundImage: `url(${content.image})` }}>
      {/* {<img style={{ display: 'none' }} src={content.image} alt={content.imageText} />} */}
      <div className={classes.overlay} />
      <Container>
        <Grid>
          <Grid item md={12}>
            <div className={classes.heroContent}>
              <Typography className={classes.heroTitle} component='p' variant='h1' color='inherit' gutterBottom>
                {content.title}
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                {content.description}
              </Typography>
              <Button variant='contained' color='primary' className={classes.button}>
                <Link href={content.buttonHref}>
                  <a>{content.buttonText}</a>
                </Link>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}
