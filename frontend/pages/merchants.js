import React from 'react'
import ProducerDashboard from '../src/components/merchants/ProducerDashboard'
import withProducer from '../src/components/hocs/withProducer'
import useAuth from '../src/utils/useAuth'

function Merchants () {
  const { isProducer } = useAuth()

  return isProducer && (
    <ProducerDashboard />
  )
}

export default withProducer(Merchants)
