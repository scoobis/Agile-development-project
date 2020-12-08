import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const PickAmountCart = (props) => {
  const { inStock, initialValue, increase, decrease, id } = props

  const [counter, setCounter] = useState(initialValue || 1)

  const handleIncrement = () => {
    if (inStock > counter) {
      setCounter(counter + 1)
      increase({ id })
    } else setCounter(counter)
  }

  const handleDecrement = () => {
    if (counter >= 2) {
      setCounter(counter - 1)
      decrease({ id })
    } else setCounter(1)
  }

  return (
    <ButtonGroup size='medium' fullWidth>
      <Button onClick={() => handleDecrement()}>-</Button>
      <Button style={{ fontSize: '16px' }} disabled>
        {counter}
      </Button>
      <Button onClick={() => handleIncrement()}>+</Button>
    </ButtonGroup>
  )
}

export default PickAmountCart
