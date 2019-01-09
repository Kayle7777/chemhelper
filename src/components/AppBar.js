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
        display: 'block',
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
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
    },
});

const AppBar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar variant="dense">
                    <div className={classes.container}>
                        <div className={classes.content}>
                            <Typography
                                className={classes.text}
                                style={{ transform: `translate(0px, -6px)` }}
                                variant="h5"
                            >
                                Breakpoints are c00l
                            </Typography>
                            <Typography
                                className={classes.text}
                                variant="subtitle1"
                                style={{ transform: `translate(0px, -2px)` }}
                            >
                                This is a test of the emergency test system
                            </Typography>
                        </div>
                    </div>
                </Toolbar>
            </MuiAppBar>
        </div>
    );
};

export default withStyles(styles)(AppBar);
