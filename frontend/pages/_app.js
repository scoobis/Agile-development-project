import React, { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/styles/theme'
import Header from '../src/components/layouts/Header/Header'
import Footer from '../src/components/layouts/Footer'
import { SnackbarProvider } from 'notistack'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
// import '../src/styles/style.css'

import dynamic from 'next/dynamic'
const AuthProvider = dynamic(() => import('../src/context/AuthContext'), {
  ssr: false
})

const CartProvider = dynamic(() => import('../src/context/CartContext'), {
  ssr: false
})

export default function MyApp (props) {
  const { Component, pageProps } = props
  const notistackRef = React.createRef()

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Webbshop</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <Header />
            <SnackbarProvider
              maxSnack={3}
              ref={notistackRef}
              action={(key) => (
                <IconButton onClick={onClickDismiss(key)}>
                  <CloseIcon color='secondary' />
                </IconButton>
              )}
            >
              <Component {...pageProps} />
            </SnackbarProvider>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
