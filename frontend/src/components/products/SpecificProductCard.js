import React from 'react'
import { Card, CardActions, CardContent } from '@material-ui/core'
import { Typography, Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PickAmount from './PickAmount'
import SelectOption from './SelectOption'

const SpecificProductCard = (props) => {
  const useStyles = makeStyles({
    root: { backgroundColor: '#d4d4d4' },
    filed1: { height: '100px' },
  })

  const { stock } = props

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
            <SelectOption />
          </Grid>
          <Grid item xs={8}>
            <PickAmount stock={stock} />
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
