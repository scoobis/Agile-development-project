import React, { useState } from 'react'
import CheckBoxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'

const categories = [
  {
    value: 'Frukt & grönt',
    label: 'Frukt & grönt',
    children: [
      {
        value: 'Frukt',
        label: 'Frukt'
      },
      {
        value: 'Grönsaker',
        label: 'Grönsaker'
      },
      {
        value: 'Potatis & rotfrukter',
        label: 'Potatis & rotfrukter'
      },
      {
        value: 'Färska kryddor',
        label: 'Färska kryddor'
      },
      {
        value: 'Svamp',
        label: 'Svamp'
      }
    ]
  },
  {
    value: 'Mejeri',
    label: 'Mejeri',
    children: [
      {
        value: 'Mjölk',
        label: 'Mjölk'
      },
      {
        value: 'Ost',
        label: 'Ost',
        children: [
          {
            value: 'Prästost',
            label: 'Prästost'
          }
        ]
      },
      {
        value: 'Ägg',
        label: 'Ägg'
      },
      {
        value: 'Grädde',
        label: 'Grädde'
      },
      {
        value: 'Smör & margarin',
        label: 'Smör & margarin'
      },
      {
        value: 'Yoghurt',
        label: 'Yoghurt'
      }
    ]
  },
  {
    value: 'Skafferi',
    label: 'Skafferi',
    children: [
      {
        value: 'Kryddor',
        label: 'Kryddor'
      },
      {
        value: 'Pasta, ris & mos',
        label: 'Pasta, ris & mos'
      },
      {
        value: 'Konserver',
        label: 'Konserver'
      },
      {
        value: 'Bönor, linser & fröer',
        label: 'Bönor, linser & fröer'
      },
      {
        value: 'Bakning',
        label: 'Bakning'
      }
    ]
  }
]

export default function MultipleSelect ({ checked, setChecked }) {
  const [expanded, setExpanded] = useState(categories.map(c => c.value))

  const handleExpand = toChange => {
    setExpanded(toChange)
  }

  return (
    <CheckBoxTree
      checked={checked}
      expanded={expanded}
      noCascade
      nodes={categories}
      onCheck={setChecked}
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
