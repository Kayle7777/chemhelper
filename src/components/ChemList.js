import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    card: {
        height: 100,
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
        },
    },
});

const ChemList = props => {
    const { classes } = props;
    return <Paper className={classes.card} />;
};

export default withStyles(styles)(ChemList);
