import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Collapse,
    Card,
    CardContent,
    FormGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';

const styles = theme => ({
    collapse: {
        position: 'relative',
        // width: '150%',
        maxHeight: '40vh',
        overflowY: 'scroll',
        zIndex: 2,
    },
    collapseIn: {
        marginBottom: theme.spacing.unit,
    },
    filterMsg: {
        marginBottom: theme.spacing.unit,
    },
});

const TagCollapse = props => {
    const { classes, tags, tagStatePassed, open } = props;
    const [tagState, doTags] = tagStatePassed;

    return (
        <Collapse
            data-testid={'collapse'}
            className={open ? `${classes.collapse} ${classes.collapseIn}` : classes.collapse}
            in={open}
        >
            <Card>
                <CardContent>
                    <FormControl component="fieldset" margin="dense">
                        <FormLabel className={classes.filterMsg} component="legend">
                            Filter by Tags
                        </FormLabel>
                        <hr />
                        {Object.keys(tags).map(category => {
                            return (
                                <Fragment key={`${category}-formgroup`}>
                                    <FormLabel component="legend">{category}</FormLabel>
                                    <FormGroup row>
                                        {Object.keys(tags[category]).map(item => {
                                            // eslint-disable-next-line
                                            const tagTextDescriptor = tags[category][item];
                                            return (
                                                <FormControlLabel
                                                    key={`${category}-${item}-checkbox`}
                                                    control={
                                                        <Checkbox
                                                            checked={tagState.includes(item)}
                                                            onChange={tagCheckChange}
                                                            value={item}
                                                        />
                                                    }
                                                    label={item.replace(/./, match => match.toUpperCase())}
                                                />
                                            );
                                        })}
                                    </FormGroup>
                                </Fragment>
                            );
                        })}
                    </FormControl>
                </CardContent>
            </Card>
        </Collapse>
    );

    function tagCheckChange(e) {
        const {
            target: { value },
        } = e;
        return doTags(tagState => {
            if (tagState.includes(value)) tagState = tagState.filter(tag => tag !== value);
            else tagState = [...tagState, value];
            return tagState;
        });
    }
};

export default withStyles(styles)(TagCollapse);
