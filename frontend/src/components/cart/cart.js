import React from 'react'
import SummaryCard from './SummaryCard'
import { IconButton, Container, Grid, Typography, TableRow } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import PickAmount from '../products/PickAmount'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const useStyles = makeStyles({
  img: { width: '90px', border: '1px solid grey' },
  hr: { border: '#dbdbdb solid 1px' },
  bold: { fontWeight: 'bold' },
  name: { fontWeight: 'bold', fontSize: '16px' },
  test: { boxShadow: 'none' },
})

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
  },
}))(TableRow)

const Cart = () => {
  const classes = useStyles()

  const handleAmountChange = (value) => 5 // TODO: implement

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper} className={classes.test}>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <TableCell align='center'>
                    <img src='/apples.jpg' className={classes.img} />
                  </TableCell>
                  <TableCell align='left' className={classes.name}>
                    Här är ett namn
                  </TableCell>
                  <TableCell>
                    <PickAmount inStock={5} handleAmountChange={handleAmountChange} />
                  </TableCell>
                  <TableCell align='right' className={classes.bold}>
                    200.00 SEK
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <TableCell align='center'>
                    <img src='/apples.jpg' className={classes.img} />
                  </TableCell>
                  <TableCell align='left' className={classes.name}>
                    Här är ett namn
                  </TableCell>
                  <TableCell>
                    <PickAmount inStock={5} handleAmountChange={handleAmountChange} />
                  </TableCell>
                  <TableCell align='right' className={classes.bold}>
                    200.00 SEK
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <SummaryCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
