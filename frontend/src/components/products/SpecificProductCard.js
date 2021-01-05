import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button, Grid, Box } from '@material-ui/core'
import { CartContext } from '../../context/CartContext'
import PickAmount from './PickAmount'
import AccordionGroup from '../AccordionGroup'
import { useSnackbar } from 'notistack'
import { CURRENCY, PRODUCERS_PATH, PRODUCT_CATEGORIES_PATH } from '../../utils/config'
import { isNull, itemsInCartAreFromSameProducer } from '../../utils/helpers'

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.common.white },
  center: { textAlign: 'center' },
  bold: { fontWeight: 'bold' },
  oldPrice: { textDecoration: 'line-through', fontSize: 16 },
  salePrice: { color: 'red', marginRight: '15px' },
  cardContent: { padding: '15px 30px' },
  lowInStock: { color: '#ffa700' },
  highInStock: { color: 'green' },
  outOfStock: { color: 'red' },
  metaData: {
    '& > *': {
      fontSize: '13px'
    }
  }
}))

const SpecificProductCard = (props) => {
  const {
    name,
    price,
    salePrice,
    unit,
    inStock,
    id,
    description,
    orgNumber,
    categories,
    tags,
    producer,
    producerDescription,
    images
  } = props
  const [amount, setAmount] = useState(1)
  const { addProduct, state } = useContext(CartContext)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleAmountChange = (value) => setAmount(value)

  const handleAddToCart = () => {
    const canAdd = itemsInCartAreFromSameProducer(state.cartProducts, orgNumber)

    if (canAdd) {
      addProduct({ id, amount, name, price, unit, orgNumber, inStock, image: images.length && images[0].imageName })

      enqueueSnackbar(`${name} har lagts till i varukorgen`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      })
    } else {
      enqueueSnackbar('Du kan endast handla från en producent per köp', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      })
    }
  }

  const getStockColor = () => {
    if (inStock === 0) {
      return classes.outOfStock
    } else if (inStock <= 2) {
      return classes.lowInStock
    }

    return classes.highInStock
  }

  const mapLinks = (arr, route) =>
    arr &&
    arr.map((item, i) => (
      <Box component='span' key={item.id}>
        <Link
          href={
            route === 'search'
              ? `/search?q=${item.name}`
              : route === 'category' && `${PRODUCT_CATEGORIES_PATH}/${item.id}`
          }
        >
          <a>{item.name}</a>
        </Link>
        {i + 1 < arr.length && ', '}
      </Box>
    ))

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <Typography variant='h3'>{name}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography align='right' variant='h6'>
              <Link href={`${PRODUCERS_PATH}/${orgNumber}`}>
                <a style={{ textDecoration: 'none', color: 'inherit' }}>{producer}</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {salePrice && (
              <Typography display='inline' className={` ${classes.bold} ${classes.salePrice} `} variant='h5'>
                {salePrice} {CURRENCY}/{unit}
              </Typography>
            )}
            <Typography display='inline' className={`${classes.bold} ${salePrice && classes.oldPrice}`} variant='h5'>
              {price} {CURRENCY}/{unit}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={getStockColor()}>{inStock} i lager</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' pb={3} pt={3}>
              <PickAmount inStock={inStock} handleAmountChange={handleAmountChange} />
              <Button
                disabled={inStock === 0}
                size='large'
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleAddToCart}
              >
                {inStock === 0 ? 'Slut i lager' : 'Lägg i kundvagn'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.metaData}>
              <Typography>Kategorier: {mapLinks(categories, 'category')}</Typography>
              <Typography>Taggar: {mapLinks(tags, 'search')}</Typography>
              <Typography>Artikelnummer: {id}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <AccordionGroup
              items={[
                {
                  heading: 'Beskrivning',
                  content: !isNull(description) ? description : ''
                },
                {
                  heading: 'Om producenten',
                  content: !isNull(producerDescription) ? producerDescription : ''
                }
              ]}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SpecificProductCard
