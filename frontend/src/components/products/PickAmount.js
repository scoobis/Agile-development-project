import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const PickAmount = () => {
  const [counter, setCounter] = useState(1)

  const handleIncrement = () => {
    setCounter(counter + 1)
  }

  const handleDecrement = () => {
    counter >= 2 ? setCounter(counter - 1) : setCounter(1)
  }

  return (
    <ButtonGroup size='small' aria-label='small outlined button group'>
      <Button onClick={handleIncrement}>+</Button>
      <Button disabled>{counter}</Button>
      <Button onClick={handleDecrement}>-</Button>
    </ButtonGroup>
  )
}

export default PickAmount
