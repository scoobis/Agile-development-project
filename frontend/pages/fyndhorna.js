import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'
import { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import ProductsGrid from '../src/components/products/ProductsGrid'

const ProductsOnSale = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setProducts([])

    getProductsOnSale().then((res) => {
      setProducts(res)
      setLoading(false)
    })
  }, [])

  const getProductsOnSale = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([])
      }, 1000)
    })
  }

  return (
    <>
      <Head>
        <title>Fyndhörna</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' align='center'>
                Fyndhörna
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box pt={3} pb={3} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <ProductsGrid products={products} />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default ProductsOnSale
