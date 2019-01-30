import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

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
            {content && (
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
                    <Typography gutterBottom variant="h5">
                        {content.name}
                    </Typography>
                    {ifContent(content.info.notes)}
                    <hr />
                    {ifContent(content.ingredients, undefined, 'INGREDIENTS: ')}
                    {ifContent(content.sources, 'overline', 'SOURCES: ')}
                    {content.info && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Depletion Rate</TableCell>
                                    <TableCell>Skin Penetration</TableCell>
                                    {/* <TableCell>Per Cycle</TableCell> */}
                                    <TableCell>Overdose Threshhold</TableCell>
                                    {/* <TableCell>Per Plant Cycle</TableCell> */}
                                    <TableCell>Units to Infect</TableCell>
                                    <TableCell>Addiction Probability</TableCell>
                                    {/* <TableCell>Application Effect</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {[
                                        'depletion_rate',
                                        'penetrates_skin',
                                        'overdose_threshhold',
                                        'units_to_infect',
                                        'addiction_probability_ingest',
                                    ].map(value => (
                                        <TableCell key={`${content}_${value}`}>
                                            {ifContent(content.info[value])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            )}
        </Card>
    );

    function ifContent(optional, variant = 'subtitle1', precedingText = '') {
        if (!optional) return '';
        else {
            if (Array.isArray(optional)) {
                if (optional.some(each => typeof each === 'object'))
                    optional = optional.reduce((accu, ing, i) => {
                        if (typeof ing === 'object') {
                            const name = Object.keys(ing)[0];
                            ing = `${name}: ${ing[name]} parts`;
                        }
                        accu += ing + (i + 1 !== optional.length ? ', ' : '.');
                        return accu;
                    }, '');
                else optional = optional.join(', ');
            }
            return <Typography variant={variant}>{precedingText + String(optional)}</Typography>;
        }
    }
};

export default withStyles(styles)(InfoPanel);
