import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core'
import { Typography, Button, } from '@material-ui/core'

const ProductCard = (props) => {

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        img: {
            width: '300px'
        },
    })

    const classes = useStyles();

    const { title, description, price, stock, imgSrc } = props

    return (
        <Card className={classes.root}>
            <CardContent>
                <img className={classes.img} alt="Remy Sharp" src={imgSrc} />
                <Typography variant="h4" component="h2">{title}</Typography>
                <Typography className={classes.pos} color="textSecondary">{description}</Typography>
                <Typography variant="h5">{price} kr</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">Köp</Button>
                <Typography className={classes.pos} color="textSecondary">{Math.ceil(stock / 10) * 10}+ i lager</Typography>
            </CardActions>
        </Card>
    )
}

export default ProductCard;