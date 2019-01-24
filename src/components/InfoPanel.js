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
    console.log(content);
    return (
        <Card className={classes.card}>
            <CardContent>
                {/* 
                    DATA SCHEMA

                    id: integer
                    name: string
                    tags: array of strings of tags
                    info: OBJECT : {
                        depletion_rate: float
                        notes: array of strings of notes
                        penetrates_skin: boolean
                        per_cycle: array of strings of per cycle info
                        __OPTIONAL__ overdose_threshhold: integer
                        __OPTIONAL__ per_plant_cycle: array of strings of per plant cycle info
                        __OPTIONAL__ units_to_infect: float
                        __OPTIONAL__ addiction_probability_ingest: float
                        __OPTIONAL__ application_effect: array of strings of info
                    }
                    __OPTIONAL__ ingredients: array of strings of names 
                            __DIFFERING DATA__ might be objects with "parts" values, key = name
                    __OPTIONAL__ reaction_message: string
                    __OPTIONAL__ sources: array of strings of sources
                    __OPTIONAL__ heat_to: integer
                */}
                <Typography>{content && JSON.stringify(content)}</Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(InfoPanel);
