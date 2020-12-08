import { Container, Typography } from '@material-ui/core'
import Link from 'next/link'
import Hero from '../src/components/Hero'

const heroObject = {
  title: 'Välkommen till REKO ringen på nätet',
  description:
    'Minska matsvinnet – En krokig morot är lika bra mat som en rak!',
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  buttonHref: '#',
  buttonText: 'Continue reading…'
}

export default function Home () {
  return (
    <Container>
      <Hero content={heroObject} />
      <Typography>Välkommen!</Typography>
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
    </Container>
  )
}
