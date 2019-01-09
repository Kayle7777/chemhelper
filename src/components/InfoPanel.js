import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = theme => ({
    card: {
        height: '25rem',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
        },
    },
});

const InfoPanel = props => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography>Test</Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(InfoPanel);
