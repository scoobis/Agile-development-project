import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../src/components/layouts/Layout'
import { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import ProductsGrid from '../src/components/products/ProductsGrid'
import SearchBar from '../src/components/SearchBar'
import { searchProducts } from '../src/utils/api'

const Search = () => {
  const router = useRouter()
  const { q } = router.query
  const [result, setResult] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setResult([])

    searchProducts(q).then((res) => {
      if (res.status === 200) {
        setResult(res.data)
      }
      setLoading(false)
    })
  }, [q])

  return (
    <>
      <Head>
        <title>Sökresultat för {q}</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' align='center'>
                Sökresultat för {q}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box pt={3} pb={3} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <ProductsGrid products={result} />
                  {!result.length && (
                    <Box pt={3} pb={3} maxWidth='300px' margin='auto'>
                      <SearchBar />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default Search
