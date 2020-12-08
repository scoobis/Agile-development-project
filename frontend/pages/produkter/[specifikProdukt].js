import { useRouter } from 'next/router'
import Layout from '../../src/components/layouts/Layout'
import SpecificProduct from '../../src/components/products/SpecificProduct'
import CartContextProvider from '../../src/context/CartContext'

const Post = () => {
  const router = useRouter()
  const { specifikProdukt } = router.query

  return (
    <Layout>
      <CartContextProvider>
        <SpecificProduct productId={specifikProdukt} />
      </CartContextProvider>
    </Layout>
  )
}

export default Post
