import { useRouter } from 'next/router'
import SpecificProduct from '../../src/components/products/specificProduct'
import ProductContextProvider from '../../src/context/ProductContext'

const Post = () => {
  const router = useRouter()
  const { specifikProdukt } = router.query

  return (
    <ProductContextProvider>
      <SpecificProduct productId={specifikProdukt} />
    </ProductContextProvider>
  )
}

export default Post
