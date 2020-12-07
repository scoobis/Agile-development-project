import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const PickAmount = (props) => {
  const { inStock, handleAmountChange } = props

  const [counter, setCounter] = useState(1)

  const handleIncrement = () => {
    inStock > counter ? setCounter(counter + 1) : setCounter(counter)
  }

  const handleDecrement = () => {
    counter >= 2 ? setCounter(counter - 1) : setCounter(1)
  }

  useEffect(() => {
    handleAmountChange(counter)
  }, [counter])

  return (
    <ButtonGroup size='medium' fullWidth>
      <Button onClick={handleDecrement}>-</Button>
      <Button style={{ fontSize: '16px' }} disabled>
        {counter}
      </Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  )
}

export default PickAmount
