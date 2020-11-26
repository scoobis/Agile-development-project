import { Container, Typography } from '@material-ui/core'
import Link from 'next/link'

export default function Home () {
  return (
    <Container maxWidth='sm'>
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
