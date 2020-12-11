import React, { useEffect, useState } from 'react'
import ChipInput from 'material-ui-chip-input'

const SelectTags = ({ onChange, defaultValues, max }) => {
  const [tags, setTags] = useState(defaultValues)

  useEffect(() => {
    onChange(tags)
  }, [tags])

  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }

  const handleDelete = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <ChipInput
      error={tags && tags.length >= max}
      helperText={`Max tillåtna taggar: ${max}`}
      label='Välj taggar'
      fullWidth
      value={tags}
      onAdd={handleAdd}
      onDelete={handleDelete}
    />
  )
}

export default SelectTags
