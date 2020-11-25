import React, { useState } from 'react'
import { Card, CardActions, CardContent } from '@material-ui/core'
import { Typography, Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PickAmount from './PickAmount'

const SpecificProductCard = (props) => {
  const options = ['Röda', 'Gröna']

  const [option, setOption] = useState([options])

  const handleChange = (event) => {
    setOption(event.target.value)
  }

  const useStyles = makeStyles({
    root: { backgroundColor: '#d4d4d4' },
    filed1: { height: '100px' },
  })

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid xs={3} item className={classes.filed1}>
            <Typography variant='h4'>120:-</Typography>
          </Grid>
          <Grid xs={9} item>
            <Typography variant='body1'>ry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when took</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField select value={option} onChange={handleChange} SelectProps={{ native: true }} helperText='Välj ett alternativ'>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <PickAmount />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size='large' fullWidth={true} variant='contained' color='primary' onClick={() => console.log('Add one to basket?')}>
          Lägg i kundvagn
        </Button>
      </CardActions>
    </Card>
  )
}

export default SpecificProductCard
