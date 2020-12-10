import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../src/components/layouts/Layout'
import SpecificProduct from '../../src/components/products/SpecificProduct'

const Product = () => {
  const router = useRouter()
  const { produkt } = router.query
  const [name, setName] = useState('')

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Layout>
        <SpecificProduct productId={produkt} onLoad={setName} />
      </Layout>
    </>
  )
}

export default Product
