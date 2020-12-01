import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PickAmount from './PickAmount'
import SelectOption from './SelectOption'

const SpecificProductCard = (props) => {
  const useStyles = makeStyles({
    root: { backgroundColor: 'white' },
    center: { textAlign: 'center' },
    bold: { fontWeight: 'bold' },
  })

  const { in_stock, price, name, unit } = props

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.center}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h3'>{name}</Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography variant='body1'>Some short deescription?</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography className={classes.bold} variant='h4'>
              {price} SEK/{unit}
            </Typography>
            <br />
            <br />
          </Grid>
          {/*
          <Grid item xs={12}>
            <SelectOption />
          </Grid>
          */}
          <Grid item xs={12}>
            <PickAmount in_stock={in_stock} />
          </Grid>
          <Grid item xs={12}>
            <Button size='large' fullWidth={true} variant='contained' color='primary' onClick={() => console.log('Add one to basket?')}>
              Lägg i kundvagn
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='caption'>I lager: {in_stock}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SpecificProductCard
