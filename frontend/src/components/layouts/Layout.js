import React from 'react'

function Layout ({ children, pt = '60', pb = '60', mh = '60' }) {
  return (
    <div style={{
      paddingTop: `${pt}px`,
      paddingBottom: `${pb}px`,
      minHeight: `${mh}vh`
    }}
    >
      {children}
    </div>
  )
}

export default Layout
