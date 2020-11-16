import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Home from './pages/Home'
import Producer from './pages/sign-up/Producer'

function App () {
  return (
    <div className='App'>
      <Router>
        <Header />

        <Switch>
          <Route path='/signup/producer'>
            <Producer />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  )
}

export default App
