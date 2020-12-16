import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'
import { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'

const ProductsOnSale = () => {
  const [producers, setProducers] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setProducers([])

    getProducers().then((res) => {
      setProducers(res)
      setLoading(false)
    })
  }, [])

  const getProducers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Kristinas gård'
          },
          {
            name: 'Jannes mejeri'
          }
        ])
      }, 1000)
    })
  }

  return (
    <>
      <Head>
        <title>Producenter</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' align='center'>
                Producenter
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box pt={3} pb={3} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {producers.map((producer) => (
                    <p align='center' key={producer.name}>
                      {producer.name}
                    </p>
                  ))}
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
