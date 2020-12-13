import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    },
    border: '1px solid #000'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch'
    },
    fontSize: '.9em'
  }
}))

const SearchBar = () => {
  const classes = useStyles()
  const [toSearch, setToSearch] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setToSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/search/?q=${toSearch}`)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={handleSubmit}>
        <InputBase
          placeholder='Sök bland 5000+ produkter'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search', minLength: 2 }}
          required
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default SearchBar
