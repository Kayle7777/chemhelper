import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = theme => ({
    card: {
        minHeight: '25rem',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
            marginTop: 0,
        },
    },
});

const InfoPanel = props => {
    const { classes, content } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography>{JSON.stringify(content)}</Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(InfoPanel);
