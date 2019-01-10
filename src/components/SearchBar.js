import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        padding: theme.spacing.unit / 3,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing.unit / 2,
        height: '3rem',
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing.unit * 3,
        },
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
        },
    },
});

const SearchBar = props => {
    const { classes, doHideButton } = props;
    return (
        <div className={classes.container}>
            <Button>Filter</Button>
            <Input fullWidth />
            <Button onClick={() => doHideButton(prev => !prev)} color="secondary">
                Hide
            </Button>
            <Button>Reset</Button>
        </div>
    );
};

export default withStyles(styles)(SearchBar);
