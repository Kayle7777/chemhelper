import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
// import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

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
                    <Typography gutterBottom variant="h5">
                        {content.name}
                    </Typography>
                    {getSafe(() => ifContent(content.info.notes))}
                    <hr />
                    {ifContent(content.ingredients, undefined, 'INGREDIENTS: ')}
                    {ifContent(content.sources, 'overline', 'SOURCES: ')}
                    {/* <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Depletion Rate</TableCell>
                                <TableCell>Skin Penetration</TableCell>
                                <TableCell>Overdose Threshhold</TableCell>
                                <TableCell>Units to Infect</TableCell>
                                <TableCell>Addiction Probability</TableCell>
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
                                        {getSafe(() => ifContent(content.info[value]))}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table> */}
                </CardContent>
            )}
        </Card>
    );

    function getSafe(fn, defaultVal = '') {
        try {
            return fn();
        } catch (err) {
            return defaultVal;
        }
    }

    function ifContent(optional, variant = 'subtitle1', precedingText = '') {
        if (optional === undefined) return '';
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
