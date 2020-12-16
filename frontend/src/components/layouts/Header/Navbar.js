import { Button, Grid, List, ListItem, Popover, Typography } from '@material-ui/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { getCategories } from '../../../utils/api'

const Navbar = () => {
  const [anchorElMenu, setAnchorElMenu] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!categories.length) {
      getCategories().then((categories) => {
        setCategories(categories)
      })
    }
  }, [])

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
        <a onClick={handleCloseMenu}>{props.title}</a>
      </Link>
    </ListItem>
  )

  const renderCategories = () => {
    return categories
      .filter((c) => c.children)
      .map((category) => (
        <Grid key={category.id} item md={3}>
          <List component='div'>
            <Typography component='div' className={styles.parentCategory}>
              <ListItemLink href={`/produkt-kategori/${category.id}`} title={category.name} />
            </Typography>
            {category.children &&
              category.children.map((child) => (
                <ListItemLink key={child.id} href={`/produkt-kategori/${child.id}`} title={child.name} />
              ))}
          </List>
        </Grid>
      ))
  }

  const renderCategoriesWithoutChildren = () => {
    const cats = categories.filter((c) => !c.children)
    return (
      cats &&
      cats.length && (
        <Grid key='other' item md={3}>
          <List component='div'>
            <Typography component='div' className={styles.parentCategory}>
              <ListItem className={styles.listItem}>Annat</ListItem>
            </Typography>
            {cats.map((c) => (
              <ListItemLink key={c.id} href={`/produkt-kategori/${c.id}`} title={c.name} />
            ))}
          </List>
        </Grid>
      )
    )
  }

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
          {renderCategories()}
          {renderCategoriesWithoutChildren()}
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
            <MenuLinkItem href='/fyndhorna' title='Fyndhörna' />
            <MenuLinkItem href='/producenter' title='Producenter' />
            <MenuLinkItem href='/sa-funkar-det' title='Så funkar det' />
          </ul>
        </nav>
      </Grid>
    </Grid>
  )
}

export default Navbar
