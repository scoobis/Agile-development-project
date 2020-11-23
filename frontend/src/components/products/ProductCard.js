import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core'
import { Typography, Button, } from '@material-ui/core'

const ProductCard = () => {

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

    return (
        <Card className={classes.root}>

            <CardContent>
                <img className={classes.img} alt="Remy Sharp" src="apples.jpg" />
                <Typography variant="h4" component="h2">Title</Typography>
                <Typography className={classes.pos} color="textSecondary">Beskrivning?</Typography>
                <Typography variant="h5">120kr</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">Köp</Button>
                <Typography className={classes.pos} color="textSecondary">50+ i lager</Typography>
            </CardActions>
        </Card>
    )
}

export default ProductCard;