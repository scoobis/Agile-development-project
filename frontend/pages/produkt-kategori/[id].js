import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../src/components/layouts/Layout'
import { Container, Grid, Typography, Box, CircularProgress } from '@material-ui/core'
import ProductsGrid from '../../src/components/products/ProductsGrid'
import { getAllProductsFromCategory } from '../../src/utils/api'

const ProductCategory = () => {
  const router = useRouter()
  const { id } = router.query
  const [isLoading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    setLoading(true)
    setProducts([])
    setName('')

    if (id) {
      getAllProductsFromCategory(id).then(({ data }) => {
        setLoading(false)

        if (data) {
          setName(data.name)
          setProducts(data.products)
        }
      })
    }
  }, [id])

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box pb={3}>
                <Typography variant='h1' component='h1' align='center'>
                  {name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box pt={3} pb={3} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                <ProductsGrid products={products} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default ProductCategory
