import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';

const styles = theme => ({
    root: {
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
    },
});

const Main = props => {
    const { classes } = props;
    return (
        <>
            <AppBar mainClasses={classes} />
        </>
    );
};

export default withStyles(styles)(Main);
