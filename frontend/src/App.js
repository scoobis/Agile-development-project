import React, { useState, useEffect } from 'react'
import './App.css'
import axios from './helpers/axios-wrapper'

function App () {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('/').then(result => {
      setMessage(result.data.message)
      console.log(result)
    })
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          {message}
        </p>
      </header>
    </div>
  )
}

export default App
