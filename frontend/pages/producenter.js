import Head from 'next/head'
import Link from 'next/link'
import Layout from '../src/components/layouts/Layout'
import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getProducers } from '../src/utils/api'

const useStyles = makeStyles({
  card: {
    minHeight: 250
  },
  cardImage: {
    height: 140
  },
  hiddenLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
})

const Producers = () => {
  const [producers, setProducers] = useState([])
  const [isLoading, setLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setLoading(true)
    setProducers([])

    getProducers().then(({ data, error }) => {
      if (data) {
        setProducers(data)
      }
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Producenter</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom variant='h1' component='h1' align='center'>
                Producenter
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box pt={3} pb={3} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                producers.length && (
                  <Grid container spacing={3}>
                    {producers.map((producer) => (
                      <Grid key={producer.id} item xs={12} sm={4} md={3}>
                        <Card className={classes.card}>
                          <Link href={`/producenter/${producer.orgNumber}`}>
                            <a className={classes.hiddenLink}>
                              <CardActionArea>
                                <CardMedia
                                  className={classes.cardImage}
                                  image='https://source.unsplash.com/random/500x400'
                                  title={producer.name}
                                />
                              </CardActionArea>
                              <CardContent>
                                <Typography gutterBottom variant='h5' component='h2'>
                                  {producer.name}
                                </Typography>
                                <Typography variant='body2' component='p'>
                                  {producer.description}
                                </Typography>
                              </CardContent>
                            </a>
                          </Link>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default Producers
