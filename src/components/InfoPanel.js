import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Table, TableRow, TableBody, TableCell } from '@material-ui/core';
// import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

const styles = theme => ({
    card: {
        minHeight: '25rem',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
            marginTop: 0,
        },
    },
    emphasizeTitle: {
        color: theme.palette.secondary.light,
        fontWeight: 'bold',
    },
    emphasizeBody: {
        fontSize: '117%',
    },
});

const InfoPanel = props => {
    const { classes, content } = props;
    const flatContent = condenseContent(content);
    return (
        <Card className={classes.card}>
            {content && (
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {flatContent.name}
                    </Typography>
                    <Table>
                        <TableBody>
                            {Object.keys(flatContent).map(infoKey => {
                                const highlight = ['ingredients', 'sources', 'notes'].includes(infoKey);
                                if (['id', 'name'].includes(infoKey)) return undefined;
                                else
                                    return (
                                        <TableRow key={`${infoKey}_generated_row`}>
                                            <TableCell className={highlight ? classes.emphasizeTitle : ''}>
                                                {infoKey}
                                            </TableCell>
                                            <TableCell className={highlight ? classes.emphasizeBody : ''}>
                                                {flatContent[infoKey]}
                                            </TableCell>
                                        </TableRow>
                                    );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            )}
        </Card>
    );

    function condenseContent(unflattenedObject) {
        // In unflattenedObject, some values may be arrays or objects
        let newObj = {};
        Object.keys(unflattenedObject).forEach(key => {
            let currentVal = unflattenedObject[key];
            if (Array.isArray(currentVal)) currentVal = `[${currentVal.join(', ')}]`;
            if (typeof currentVal === 'boolean') currentVal = currentVal.toString();
            if (typeof currentVal === 'object' && !Array.isArray(currentVal)) {
                newObj = { ...newObj, ...currentVal };
            } else newObj = { ...newObj, [key]: currentVal };
        });
        return newObj;
    }
};

export default withStyles(styles)(InfoPanel);
