import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  summaryContainer: {
    background: '#e3e3e3',
    padding: '40px 30px 50px 30px',
    width: '350px',
  },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  test: {
    float: 'right',
    fontWeight: 'bold',
  },
})

// TDOD: remove <br />?
const SummaryCard = (props) => {
  const { total } = props
  const classes = useStyles()
  return (
    <Grid className={classes.summaryContainer}>
      <Typography variant='h4' className={classes.title}>
        Summary
      </Typography>

      <Typography display='inline' variant='body1'>
        Order belopp
      </Typography>
      <Typography className={classes.test} variant='body1'>
        {total}.00 SEK
      </Typography>
      <br />
      <br />
      <hr />
      <Typography display='inline' variant='body1'>
        Frakt??
      </Typography>
      <Typography className={classes.test} variant='body1'>
        75.00 SEK
      </Typography>
      <br />
      <br />
      <br />
      <hr />
      <Typography display='inline' variant='body1'>
        SubTotal
      </Typography>
      <Typography className={classes.test} variant='h4'>
        {total + 75}.00 SEK
      </Typography>
      <br />
      <br />
      <br />
      <br />
      <Button size='large' fullWidth variant='contained' color='primary'>
        Till betalning
      </Button>
    </Grid>
  )
}

export default SummaryCard
