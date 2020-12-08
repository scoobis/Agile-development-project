import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const PickAmountCart = (props) => {
  const { inStock, initialValue, increase, id } = props

  const [counter, setCounter] = useState(initialValue || 1)

  const handleIncrement = () => {
    if (inStock > counter) {
      setCounter(counter + 1)
      increase({ id: id })
    } else setCounter(counter)
  }

  return (
    <ButtonGroup size='medium' fullWidth>
      <Button onClick={() => increase({ id: id })}>-</Button>
      <Button style={{ fontSize: '16px' }} disabled>
        {counter}
      </Button>
      <Button onClick={() => handleIncrement()}>+</Button>
    </ButtonGroup>
  )
}

export default PickAmountCart
