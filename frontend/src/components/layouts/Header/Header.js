import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import Link from 'next/link'
import SearchBar from '../../SearchBar'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  header: {
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  logo: {
    maxWidth: '200px'
  },
  iconMenu: {
    display: 'flex'
  }
}))

export default function Header () {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <AppBar position='relative' color='inherit' className={classes.header}>
        <Toolbar>
          <div className={classes.logo}>
            <Link href='/'>
              <a><img src='/logga-reko-cirkel.svg' height='60' /></a>
            </Link>
          </div>
          <div className={classes.grow} />
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.iconMenu}>
            <Link href='/registrera'>
              <a>
                <IconButton
                  edge='end'
                  onClick={() => console.log('Clicked account button!')}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>

              </a>
            </Link>
            <IconButton
              edge='end'
              onClick={() => console.log('Clicked cart button!')}
              color='inherit'
            >
              <LocalMallOutlinedIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}