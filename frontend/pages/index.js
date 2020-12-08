import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
import Hero from '../src/components/Hero'
import Layout from '../src/components/layouts/Layout'

const heroContent = {
  title: 'Välkommen till REKO-ringen på nätet',
  description:
    'Minska matsvinnet – En krokig morot är lika bra mat som en rak!',
  image: 'https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d',
  imageText: 'main image description',
  buttonHref: '#',
  buttonText: 'Så funkar det'
}

export default function Home () {
  return (
    <Layout pt='0'>
      <Container maxWidth={false} disableGutters>
        <Hero content={heroContent} />
      </Container>
      <Container maxWidth='sm' style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <Box textAlign='center'>
          <Box pb={3}>
            <Typography variant='h2'>Välkommen till REKO-ringen</Typography>
          </Box>
          <Box pb={3}>
            <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
           tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
             ex ea commodo consequat.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container maxWidth={false} disableGutters style={{ backgroundColor: '#f9f9f9' }}>
        <Grid container>
          <Grid item md={6}>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              height='100%'
              padding='60px'
            >
              <Box mb={3}>
                <Typography variant='h3'>
                  Handla ekologiskt från producenter nära dig
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='body1' paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </Box>
              <Box>
                <Button variant='contained' color='primary' disableElevation>
                Börja handla
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <img style={{ maxWidth: '100%' }} src='https://images.unsplash.com/photo-1471193945509-9ad0617afabf' />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align='center' variant='h3'>Senast inkommet</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>
              <Link href='/bli-producent'>
                <a>Registrera dig som producent</a>
              </Link>
            </Typography>
            <Typography>
              <Link href='/registrera'>
                <a>Registrera dig som kund</a>
              </Link>
            </Typography>
            <Typography>
              <Link href='/produkter'>
                <a>See all produkter</a>
              </Link>
            </Typography>
            <Typography><Link href='/logga-in'>Logga in</Link></Typography>
            <Typography>
              <Link href='/merchants'>Producenter</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}
