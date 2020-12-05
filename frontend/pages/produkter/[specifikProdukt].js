import { useRouter } from 'next/router'
import SpecificProduct from '../../src/components/products/SpecificProduct'

const Post = () => {
  const router = useRouter()
  const { specificProduct } = router.query

  return <SpecificProduct productId={specificProduct} />
}

export default Post
