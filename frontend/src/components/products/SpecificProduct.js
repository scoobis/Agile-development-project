import React, { useContext } from 'react'
import { ProductContext } from '../../context/productContext/ProductContext'

const SpecificProduct = (props) => {
  // Better solutions?
  const { products } = useContext(ProductContext)
  const { specifikProduktId } = props
  const product = products.find((x) => x.id === parseInt(specifikProduktId))

  return <h1>{product.title}</h1>
}

export default SpecificProduct
