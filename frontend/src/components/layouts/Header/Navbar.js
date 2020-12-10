import { Button, Grid, List, ListItem, Popover, Typography } from '@material-ui/core'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Navbar.module.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Navbar = () => {
  const [anchorElMenu, setAnchorElMenu] = useState(null)

  const handleClickMenu = (e) => {
    setAnchorElMenu(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  const MenuLinkItem = (props) => (
    <li>
      <Link href={props.href}>
        <a>{props.title}</a>
      </Link>
    </li>
  )

  const ListItemLink = (props) => (
    <ListItem className={styles.listItem}>
      <Link href={props.href}>
        <a>{props.title}</a>
      </Link>
    </ListItem>
  )

  const ProductSubMenu = () => (
    <Popover
      anchorEl={anchorElMenu}
      keepMounted
      open={Boolean(anchorElMenu)}
      onClose={handleCloseMenu}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <div className={styles.megaMenu}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <List component='div'>
              <Typography component='div' className={styles.parentCategory}>
                <ListItemLink href='/produkter' title='Alla produkter' />
              </Typography>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List component='div'>
              <Typography component='div' className={styles.parentCategory}>
                <ListItemLink href='#' title='Grönsaker' />
              </Typography>
              <ListItemLink href='#' title='Gurka' />
              <ListItemLink href='#' title='Tomat' />
              <ListItemLink href='#' title='Lök' />
              <ListItemLink href='#' title='Sallad' />
              <ListItemLink href='#' title='Ärter & bönor' />
            </List>
          </Grid>
          <Grid item xs={3}>
            <List component='div'>
              <Typography component='div' className={styles.parentCategory}>
                <ListItemLink href='#' title='Frukt' />
              </Typography>
              <ListItemLink href='#' title='Äpple' />
              <ListItemLink href='#' title='Päron' />
              <ListItemLink href='#' title='Persika' />
            </List>
          </Grid>
          <Grid item xs={3}>
            <List component='div'>
              <Typography component='div' className={styles.parentCategory}>
                <ListItemLink href='#' title='Mejeri' />
              </Typography>
              <ListItemLink href='#' title='Mjölk' />
              <ListItemLink href='#' title='Ägg' />
              <ListItemLink href='#' title='Ost' />
            </List>
          </Grid>
          <Grid item xs={3}>
            <List component='div'>
              <Typography component='div' className={styles.parentCategory}>
                <ListItemLink href='#' title='Kött' />
              </Typography>
              <ListItemLink href='#' title='Nötkött' />
              <ListItemLink href='#' title='Fläskkött' />
              <ListItemLink href='#' title='Lamm, kalv & vilt' />
              <ListItemLink href='#' title='Kyckling & fågel' />
            </List>
          </Grid>
        </Grid>
      </div>
    </Popover>
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <nav className={styles.mainMenu}>
          <ul>
            <Button onClick={handleClickMenu} className={styles.button}>
              Handla
              <ExpandMoreIcon />
            </Button>
            <ProductSubMenu />
            <MenuLinkItem href='#' title='Fyndhörna' />
            <MenuLinkItem href='#' title='Producenter' />
            <MenuLinkItem href='#' title='Så funkar det' />
          </ul>
        </nav>
      </Grid>
    </Grid>
  )
}

export default Navbar
