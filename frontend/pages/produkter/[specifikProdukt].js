import { useRouter } from 'next/router'
import SpecificProduct from '../../src/components/products/SpecificProduct'
import CartContextProvider from '../../src/context/CartContext'

const Post = () => {
  const router = useRouter()
  const { specifikProdukt } = router.query

  return (
    <CartContextProvider>
      <SpecificProduct productId={specifikProdukt} />
    </CartContextProvider>
  )
}

export default Post
