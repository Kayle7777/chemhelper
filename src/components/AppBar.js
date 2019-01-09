import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    text: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    content: {
        position: 'absolute',
        display: 'flex',
    },
});

const AppBar = props => {
    const { classes, mainClasses } = props;
    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar variant="dense">
                    <div className={mainClasses.container}>
                        <div className={classes.content}>
                            <Typography
                                className={classes.text}
                                style={{ transform: `translate(0px, -6px)` }}
                                variant="h5"
                            >
                                Breakpoints are c00l
                            </Typography>
                            <Typography className={classes.text} variant="subtitle1">
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
