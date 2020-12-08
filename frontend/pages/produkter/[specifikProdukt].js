import { useRouter } from 'next/router'
import Layout from '../../src/components/layouts/Layout'
import SpecificProduct from '../../src/components/products/SpecificProduct'

const Post = () => {
  const router = useRouter()
  const { specifikProdukt } = router.query

  return (
    <Layout>
      <SpecificProduct productId={specifikProdukt} />
    </Layout>
  )
}

export default Post
