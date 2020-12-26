import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../src/components/layouts/Layout'
import SpecificProduct from '../../src/components/products/SpecificProduct'
import { getOneProduct, getProducer } from '../../src/utils/api'

const Product = () => {
  const router = useRouter()
  const { produkt } = router.query
  const [product, setProduct] = useState({})

  useEffect(() => {
    if (produkt) {
      getOneProduct(produkt).then((response) => {
        getProducer(response.orgNumber).then(({ data }) => {
          setProduct({ ...response, producer: data.name, producerDescription: data.description })
        })
      })
    }
  }, [produkt])

  return (
    <>
      <Head>
        <title>{product.name || ''}</title>
      </Head>
      <Layout>{Object.keys(product).length && <SpecificProduct product={product} />}</Layout>
    </>
  )
}

export default Product
