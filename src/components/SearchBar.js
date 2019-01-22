import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Input,
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
    container: {
        display: 'flex',
        padding: theme.spacing.unit / 3,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing.unit / 2,
        height: '3rem',
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing.unit * 3,
        },
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
        },
    },
    popover: {
        marginTop: theme.spacing.unit,
    },
    cardContainer: {
        position: 'relative',
    },
});

const TagPopover = props => {
    const { classes, tags, anchorState, tagStatePassed } = props;
    const [tagState, doTags] = tagStatePassed;
    const [popoverAnchor, controlPopover] = anchorState;
    return (
        <Popover
            className={classes.popover}
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={() => controlPopover(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Card className={classes.cardContainer}>
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Filter by Tags</FormLabel>
                        <FormGroup>
                            {Object.keys(tags).map(e => {
                                return (
                                    <FormControlLabel
                                        key={`${e}-form-control`}
                                        control={
                                            <Checkbox
                                                checked={tagState.includes(e)}
                                                onChange={tagCheckChange}
                                                value={e}
                                            />
                                        }
                                        label={e.replace(/./, match => match.toUpperCase())}
                                    />
                                );
                            })}
                        </FormGroup>
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
            else tagState.push(value);
            return tagState;
        });
    }
};

const SearchBar = props => {
    const { classes, doHideButton, tags, inputState, tagStatePassed } = props;
    const [popoverAnchor, controlPopover] = useState(null);
    const [searchInput, typeSearch] = inputState;

    return (
        <div className={classes.container}>
            <TagPopover
                tagStatePassed={tagStatePassed}
                classes={classes}
                tags={tags}
                anchorState={[popoverAnchor, controlPopover]}
            />
            <Button onClick={e => controlPopover(e.currentTarget)}>Filter</Button>
            <Input fullWidth value={searchInput} onChange={inputType} />
            <Button onClick={() => doHideButton(prev => !prev)} color="secondary">
                Hide
            </Button>
            <Button>Reset</Button>
        </div>
    );

    function inputType(e) {
        const {
            target: { value },
        } = e;
        return typeSearch(value);
    }
};

export default withStyles(styles)(SearchBar);
