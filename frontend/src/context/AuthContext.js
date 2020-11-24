import React, { useState, createContext, useEffect } from 'react'
import { getTokenCookie } from '../utils/auth-cookies'

export const AuthContext = createContext()

const AuthProvider = props => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      const hasToken = getTokenCookie()
      if (hasToken) {
        setAuthenticated(true)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
