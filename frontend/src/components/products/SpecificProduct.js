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
    gridContainer: { paddingTop: '40px' },
  })

  const [product, setProduct] = useState({})

  // TODO: get id does not work when reloading
  const { specifikProduktId } = props
  useEffect(() => {
    getOneProduct(specifikProduktId).then((response) => {
      setProduct(response)
    })
  }, [])

  const { imgSrc, name, description, in_stock, price, unit } = product

  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid className={classes.gridContainer} container spacing={24}>
        <Grid item xs={7}>
          <img className={classes.img} alt='Produkt bild' src={`/${imgSrc}`} />
        </Grid>
        <Grid item xs={5}>
          <SpecificProductCard in_stock={in_stock} price={price} name={name} unit={unit} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.pos} variant='h6' color='textSecondary'>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpecificProduct
