import React, { useState, createContext, useEffect } from 'react'
import { setUserCookie, getUserCookie, removeUserCookie } from '../utils/auth-cookies'
import { login } from '../utils/api'
import { Producer, Customer } from '../utils/roles'
import Router from 'next/router'

export const AuthContext = createContext()

const AuthProvider = (props) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    user: {}
  })

  useEffect(() => {
    if (!user.isAuthenticated) {
      const userCookie = getUserCookie()
      if (userCookie) {
        setUser({ ...user, isAuthenticated: true, user: userCookie })
      }
    }
  }, [])

  const authenticate = (user) => {
    return login(user).then((response) => {
      if (response.status === 200) {
        const userToSave = {
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          token: response.data.token,
          orgNumber: response.data.orgNumber || null
        }

        setUser({ ...user, isAuthenticated: true, user: userToSave })
        setUserCookie(userToSave)
      }

      return response
    })
  }

  const signout = () => {
    Router.push('/')
    setUser({ ...user, isAuthenticated: false, user: {} })
    removeUserCookie()
  }

  const isProducer = user.isAuthenticated && user.user.role === Producer
  const isCustomer = user.isAuthenticated && user.user.role === Customer

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        signout,
        user,
        setUser,
        isProducer,
        isCustomer
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
