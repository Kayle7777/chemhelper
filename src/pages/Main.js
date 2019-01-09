import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import InfoPanel from '../components/InfoPanel';
import ChemList from '../components/ChemList';

const styles = theme => ({
    container: {
        margin: 'auto',
        [theme.breakpoints.up('md')]: {
            width: 1140 + theme.spacing.unit * 4,
            display: 'flex',
            marginTop: '2rem',
        },
        [theme.breakpoints.up('xl')]: {
            width: 1750 + theme.spacing.unit * 4,
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    leftContainer: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 1.5,
        },
    },
    infoPanel: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit * 1.5,
            marginRight: theme.spacing.unit * 3,
        },
    },
});

const Main = props => {
    const { classes } = props;
    return (
        <>
            <AppBar />
            <div className={classes.container}>
                <div className={classes.leftContainer}>
                    <SearchBar />
                    <ChemList />
                </div>
                <div className={classes.infoPanel}>
                    <InfoPanel />
                </div>
            </div>
        </>
    );
};

export default withStyles(styles)(Main);
