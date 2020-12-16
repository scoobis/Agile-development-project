import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import { PRODUCERS_PATH, REGISTER_PRODUCER_PATH } from '../../utils/config'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.black,
    padding: '60px 30px',
    overflowX: 'hidden',
    color: '#aaa',

    '& ul': {
      lineHeight: 2
    },

    '& a': {
      color: theme.palette.common.white,
      textDecoration: 'none'
    }
  },
  subHeading: {
    textTransform: 'uppercase'
  },
  menu: {
    listStyleType: 'none',
    paddingInlineStart: 0,
    marginTop: '0'
  }
}))

function Footer () {
  const classes = useStyles()
  const currentYear = new Date().getFullYear()

  return (
    <div className={classes.footer}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          <Typography variant='subtitle1' paragraph className={classes.subHeading}>
            Om Site Title
          </Typography>

          <ul className={classes.menu}>
            <li>
              <Link href='#'>
                <a>Om Site Title</a>
              </Link>
            </li>
            <li>
              <Link href={PRODUCERS_PATH}>
                <a>Producenter</a>
              </Link>
            </li>
            <li>
              <Link href={REGISTER_PRODUCER_PATH}>
                <a>Bli producent</a>
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item sm={12} md={4}>
          <Typography variant='subtitle1' paragraph className={classes.subHeading}>
            Hjälp
          </Typography>

          <ul className={classes.menu}>
            <li>
              <Link href='#'>
                <a>Vanliga frågor och svar</a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a>Så funkar det</a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a>Leveranstider</a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a>Kontakta oss</a>
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item sm={12} md={4}>
          <Typography variant='subtitle1' paragraph className={classes.subHeading}>
            Annat
          </Typography>

          <Typography variant='body2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>© {currentYear} Team 2</Typography>
      </Grid>
    </div>
  )
}

export default Footer
