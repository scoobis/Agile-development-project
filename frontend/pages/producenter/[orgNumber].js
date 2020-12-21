import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../src/components/layouts/Layout'
import { Container, Grid, Typography, Box, CircularProgress } from '@material-ui/core'
import { getProducer } from '../../src/utils/api'
import SpecificProducer from '../../src/components/SpecificProducer'

const Producer = () => {
  const router = useRouter()
  const { orgNumber } = router.query

  const [isLoading, setLoading] = useState(false)
  const [producer, setProducer] = useState({})

  useEffect(() => {
    setLoading(true)
    setProducer({})

    if (orgNumber) {
      getProducer(orgNumber).then(({ data }) => {
        console.log(data)
        setLoading(false)

        const address = {
          street: 'Drottninggatan 49',
          zip: '11121',
          city: 'Stockholm'
        }

        if (data) {
          setProducer({ ...data, ...address })
        }
      })
    }
  }, [orgNumber])

  return (
    <>
      <Head>
        <title>{producer.name}</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box pb={3}>
                <Typography variant='h1' component='h1' align='center'>
                  {producer.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box pt={3} pb={3} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : producer && producer.name ? (
                <SpecificProducer producer={producer} />
              ) : (
                <Typography align='center'>Ingen producent hittades med organisationsnumret {orgNumber}</Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default Producer
