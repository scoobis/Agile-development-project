import React from 'react'

const OrderDetials = (props) => {
  const { order } = props
  return (
    <div>
      <h1>{order.id}</h1>
    </div>
  )
}

export default OrderDetials
