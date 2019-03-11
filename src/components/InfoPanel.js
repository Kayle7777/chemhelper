import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableRow,
    TableBody,
    TableCell,
    FormGroup,
    FormControlLabel,
    Switch,
} from '@material-ui/core';

const styles = theme => ({
    card: {
        minHeight: '25rem',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
            marginTop: 0,
        },
        position: 'relative',
    },
    emphasizeTitle: {
        color: theme.palette.secondary.light,
        fontWeight: 'bold',
    },
    emphasizeBody: {
        fontSize: '117%',
    },
    tagButtonGroup: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    tagButton: {
        // position: 'relative',
        // margin: 'auto',
        textAlign: 'center',
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
    },
});

const InfoPanel = props => {
    const { classes, content, passedTagState } = props;
    const [tagState, doTags] = passedTagState;
    const flatContent = condenseContent(content);
    return (
        <Card className={classes.card}>
            {content && (
                <>
                    <FormGroup row className={classes.tagButtonGroup}>
                        {generateLinks(content.tags)}
                    </FormGroup>
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
                </>
            )}
        </Card>
    );

    function generateLinks(contentTags) {
        return contentTags.map(eachTag => {
            return (
                <FormControlLabel
                    control={<Switch checked={tagState.includes(eachTag)} onChange={buttonClick} value={eachTag} />}
                    className={classes.tagButton}
                    key={`${eachTag}_infopanel_key`}
                    variant={'text'}
                    label={eachTag}
                >
                    {eachTag}
                </FormControlLabel>
            );
        });

        function buttonClick(e) {
            const {
                target: { value },
            } = e;
            if (!tagState.includes(value)) return doTags(prev => [...prev, value]);
            else return doTags(prev => prev.filter(eachTag => eachTag != value));
        }
    }

    function condenseContent(unflattenedObject) {
        // In unflattenedObject, some values may be arrays or objects
        let newObj = {};
        Object.keys(unflattenedObject).forEach(key => {
            let currentVal = unflattenedObject[key];
            if (Array.isArray(currentVal)) currentVal = `[${currentVal.join(', ')}]`;
            if (typeof currentVal === 'boolean') currentVal = currentVal.toString();
            if (typeof currentVal === 'object' && !Array.isArray(currentVal)) {
                newObj = { ...newObj, ...currentVal };
            } else if (key == 'tags') return;
            else newObj = { ...newObj, [key]: currentVal };
        });
        return newObj;
    }
};

export default withStyles(styles)(InfoPanel);
