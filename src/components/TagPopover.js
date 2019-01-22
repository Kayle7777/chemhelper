import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Popover,
    Card,
    CardContent,
    FormGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormHelperText,
    Checkbox,
} from '@material-ui/core';

const styles = theme => ({
    popover: {
        marginTop: theme.spacing.unit,
    },
    filterMsg: {
        marginBottom: theme.spacing.unit,
    },
});

const TagPopover = props => {
    const { classes, tags, anchorState, tagStatePassed } = props;
    const [tagState, doTags] = tagStatePassed;
    const [popoverAnchor, controlPopover] = anchorState;
    return (
        <Popover
            data-testid={'popover'}
            className={classes.popover}
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={() => controlPopover(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Card>
                <CardContent>
                    <FormControl component="fieldset" margin="dense">
                        <FormLabel className={classes.filterMsg} component="legend">
                            Filter by Tags
                        </FormLabel>
                        {Object.keys(tags).map(category => {
                            return (
                                <Fragment key={`${category}-formgroup`}>
                                    <FormLabel component="legend">{category}</FormLabel>
                                    <FormGroup row>
                                        {Object.keys(tags[category]).map(item => {
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
        </Popover>
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

export default withStyles(styles)(TagPopover);
