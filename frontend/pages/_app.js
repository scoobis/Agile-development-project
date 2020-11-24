import React, { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from '../src/components/layouts/Header/Header'
import Footer from '../src/components/layouts/Footer'
import Layout from '../src/components/layouts/Layout'
import AuthProvider from '../src/context/AuthContext'

export default function MyApp (props) {
  const { Component, pageProps } = props

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
          <Header />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
