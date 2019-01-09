import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        minHeight: '100%',
        [theme.breakpoints.up('md')]: {
            width: 1140,
        },
    },
});

const Main = props => {
    const { classes } = props;
    return (
        <>
            <AppBar classes={classes} />
        </>
    );
};

export default withStyles(styles)(Main);
