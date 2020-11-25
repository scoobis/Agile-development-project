import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const { user, setUser, authenticate, signout, isCustomer, isProducer } = useContext(AuthContext)
  return { user, setUser, authenticate, signout, isCustomer, isProducer }
}

export default useAuth
