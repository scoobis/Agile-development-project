import React, { useEffect, useState } from 'react'
import CheckBoxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'

function getNodeIds (nodes) {
  let ids = []

  nodes && nodes.forEach(({ value, children }) => {
    ids = [...ids, value, ...getNodeIds(children)]
  })

  return ids
}

export default function MultipleSelect ({ options, checked, onChecked }) {
  const [expanded, setExpanded] = useState([])

  const handleExpand = toChange => {
    setExpanded(toChange)
  }

  useEffect(() => {
    if (options && options.length) {
      setExpanded(getNodeIds(options))
    }
  }, [options])

  return (
    <CheckBoxTree
      checked={checked}
      expanded={expanded}
      noCascade
      nativeCheckboxes
      nodes={options}
      onCheck={onChecked}
      onExpand={handleExpand}
      icons={{
        check: <CheckBoxOutlinedIcon />,
        uncheck: <CheckBoxOutlineBlankIcon />,
        halfCheck: <CheckBoxOutlinedIcon />,
        expandClose: <KeyboardArrowRightIcon />,
        expandOpen: <KeyboardArrowDownIcon />,
        expandAll: <AddBoxOutlinedIcon />,
        collapseAll: <RemoveOutlinedIcon />,
        parentClose: '',
        parentOpen: '',
        leaf: ''
      }}
    />
  )
}
