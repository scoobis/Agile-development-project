import React from 'react'
import { Typography, Button, Grid, Box, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  summaryContainer: {
    background: '#e3e3e3',
    padding: '40px 30px 50px 30px',
    width: '350px'
  },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold'
  }
})

const SummaryCard = (props) => {
  const { total } = props
  const classes = useStyles()

  return (
    <Grid className={classes.summaryContainer}>
      <Box>
        <Typography variant='h4' className={classes.title}>
          Detaljer
        </Typography>
      </Box>
      <Box pb={1} mb={1} borderBottom='1px solid #999' display='flex' justifyContent='space-between'>
        <Typography variant='body1'>Delsumma</Typography>
        <Typography className={classes.price} variant='body1'>
          {total}.00 SEK
        </Typography>
      </Box>
      <Box pb={1} mb={1} borderBottom='1px solid #999' display='flex' justifyContent='space-between'>
        <Typography variant='body1'>Frakt</Typography>
        <Typography className={classes.price} variant='body1'>
          Hämtas på plats
        </Typography>
      </Box>
      <Box pt={4} pb={4} display='flex' justifyContent='space-between'>
        <Typography variant='body1'>Totalsumma</Typography>
        <Typography className={classes.price} variant='h4'>
          {total}.00 SEK
        </Typography>
      </Box>
      <Box>
        <Link style={{ textDecoration: 'none' }} href='/kassa'>
          <a>
            <Button size='large' fullWidth variant='contained' color='primary'>
              Till kassan
            </Button>
          </a>
        </Link>
      </Box>
    </Grid>
  )
}

export default SummaryCard
