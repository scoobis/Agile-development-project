import { useEffect } from 'react'
import Router from 'next/router'
import useAuth from '../../utils/useAuth'

const withProducer = WrappedComponent => {
  const Wrapper = props => {
    const { isProducer } = useAuth()

    useEffect(() => {
      if (!isProducer) {
        Router.replace('/logga-in')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withProducer
