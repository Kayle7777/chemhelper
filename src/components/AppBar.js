import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    container: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            width: 1140,
        },
        [theme.breakpoints.up('xl')]: {
            width: 1750,
        },
    },
    text: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    content: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
    },
});

const AppBar = props => {
    const { classes } = props;
    return (
        <MuiAppBar className={classes.root} position="static">
            <Toolbar className={classes.container} variant="dense">
                <div className={classes.content}>
                    <Typography className={classes.text} variant="h5">
                        ChemHelper
                    </Typography>
                    <Typography
                        className={classes.text}
                        variant="subtitle1"
                        style={{ transform: `translate(0px, 6px)` }}
                    >
                        A chemistry helper app for Space Station 13 Goonstation
                    </Typography>
                </div>
            </Toolbar>
        </MuiAppBar>
    );
};

export default withStyles(styles)(AppBar);
