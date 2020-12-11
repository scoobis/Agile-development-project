import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { CartContext } from '../../../context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import SearchBar from '../../SearchBar'
import { Badge, Menu, MenuItem } from '@material-ui/core'
import Navbar from './Navbar'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  header: {
    paddingTop: '10px'
  },
  logo: {
    maxWidth: '200px'
  },
  iconMenu: {
    display: 'flex',
    '& > *': {
      color: theme.palette.common.black
    }
  },
  cart: {
    right: -3,
    top: -7
  }
}))

export default function Header () {
  const classes = useStyles()
  const { signout, user, isCustomer, isProducer } = useContext(AuthContext)
  const { state } = useContext(CartContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const isMenuOpen = Boolean(anchorEl)

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignout = () => {
    router.push('/')
    signout()
  }

  const LinkMenuItem = (props) => (
    <Link href={props.href}>
      <a>
        <MenuItem>{props.title}</MenuItem>
      </a>
    </Link>
  )

  const renderAccountDropdownMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='my-account-menu'
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!user.isAuthenticated ? (
        <div>
          <LinkMenuItem href='/logga-in' title='Logga in' />
          <LinkMenuItem href='/registrera' title='Registrera' />
          <LinkMenuItem href='/bli-producent' title='Bli producent' />
        </div>
      ) : isCustomer ? (
        <div>
          <LinkMenuItem href='/mitt-konto' title='Mitt konto' />
          <MenuItem onClick={handleSignout}>Logga ut</MenuItem>
        </div>
      ) : (
        isProducer && (
          <div>
            <LinkMenuItem href='/merchants' title='Mina produkter' />
            <LinkMenuItem href='/merchants' title='Mitt konto' />
            <MenuItem onClick={handleSignout}>Logga ut</MenuItem>
          </div>
        )
      )}
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='relative' color='inherit' className={classes.header}>
        <Toolbar>
          <div className={classes.logo}>
            <Link href='/'>
              <a>
                <img src='/logga-reko-cirkel.svg' height='60' />
              </a>
            </Link>
          </div>
          <div className={classes.grow} />
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.iconMenu}>
            <IconButton edge='end' onClick={handleAccountMenuOpen} color='inherit'>
              <AccountCircle />
            </IconButton>
            <Link href='/varukorg'>
              <a>
                <IconButton edge='end' color='inherit'>
                  <LocalMallOutlinedIcon />
                  <Badge
                    className={classes.cart}
                    color='secondary'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    badgeContent={state.cartProducts ? state.cartProducts.length : 0}
                  />
                </IconButton>
              </a>
            </Link>
          </div>
        </Toolbar>
        <Navbar />
      </AppBar>
      {renderAccountDropdownMenu}
    </div>
  )
}
