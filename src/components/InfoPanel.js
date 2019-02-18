import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core';
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
                    {ifContent(content.ingredients, undefined, 'INGREDIENTS: ')}
                    {ifContent(content.sources, 'overline', 'SOURCES: ')}
                    {content.info && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>key</TableCell>
                                    <TableCell>value</TableCell>
                                </TableRow>
                                {Object.keys(content.info).map(infoKey => (
                                    <TableRow key={`${infoKey}_generated_row`}>
                                        <TableCell>{infoKey}</TableCell>
                                        <TableCell>{content.info[infoKey]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableHead>
                        </Table>
                    )}
                </CardContent>
            )}
        </Card>
    );

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
