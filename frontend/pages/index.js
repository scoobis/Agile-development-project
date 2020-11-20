import { Container, Typography } from '@material-ui/core'
import Link from 'next/link'

export default function Home () {
  return (
    <Container maxWidth='sm'>
      <Typography>
        Hello from Home!
      </Typography>
      <Typography>
        Registrera dig som producent <Link href='/bli-producent'><a>här</a></Link>
      </Typography>
      <Typography>
        Registrera dig som kund <Link href='/registrera'><a>här</a></Link>
      </Typography>
    </Container>
  )
}