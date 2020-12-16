import { Container, Grid, Typography } from '@material-ui/core'
import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'

const CartPage = () => {
  return (
    <>
      <Head>
        <title>Så funkar det</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' align='center'>
                Så funkar det
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <p align='center'>Kommer snart...</p>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default CartPage
