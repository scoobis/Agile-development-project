import { useRouter } from 'next/router'
import SpecificProduct from '../../src/components/products/SpecificProduct'

const Post = () => {
  const router = useRouter()
  const { specifikProdukt } = router.query

  return <SpecificProduct productId={specifikProdukt} />
}

export default Post
