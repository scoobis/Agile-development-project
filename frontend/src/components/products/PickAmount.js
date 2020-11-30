import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const PickAmount = (props) => {
  const { in_stock } = props

  const [counter, setCounter] = useState(1)

  const handleIncrement = () => {
    in_stock > counter ? setCounter(counter + 1) : setCounter(counter)
  }

  const handleDecrement = () => {
    counter >= 2 ? setCounter(counter - 1) : setCounter(1)
  }

  return (
    <ButtonGroup size='small' aria-label='small outlined button group'>
      <Button onClick={handleDecrement}>-</Button>
      <Button disabled>{counter}</Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  )
}

export default PickAmount
