import { Container } from '@material-ui/core'
import React from 'react'

function Layout ({ children }) {
  return (
    <div style={{ paddingTop: '60px', paddingBottom: '60px', minHeight: '60vh' }}>
      {children}
    </div>
  )
}

export default Layout
