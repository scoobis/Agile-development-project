import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import SpecificProductCard from './SpecificProductCard'
import { getOneProduct } from '../../utils/api'
const SpecificProduct = (props) => {
  const useStyles = makeStyles({
    img: {
      borderRadius: '20px',
      width: '500px',
    },
    container: { boxShadow: '0 1px 1px 1px black' },
  })

  const [product, setProduct] = useState({})

  const { specifikProduktId } = props
  useEffect(() => {
    getOneProduct(specifikProduktId).then((response) => {
      setProduct(response)
    })
  }, [])

  const { imgSrc, title, description, stock } = product

  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.pos} variant='h6' color='textSecondary'>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <img className={classes.img} alt='Produkt bild' src={`/${imgSrc}`} />
        </Grid>
        <Grid item xs={5}>
          <SpecificProductCard stock={stock} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpecificProduct
