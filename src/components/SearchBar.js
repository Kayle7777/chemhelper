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

const SearchBar = props => {
    const { classes, doHideButton, tags, inputState, tagState } = props;
    const [popoverAnchor, controlPopover] = useState(null);
    const [searchInput, typeSearch] = inputState;
    const [tagStates, doTags] = tagState;

    return (
        <div className={classes.container} data-testid="searchbar">
            <TagPopover
                tagStatePassed={tagState}
                classes={classes}
                tags={tags}
                anchorState={[popoverAnchor, controlPopover]}
            />
            <Button onClick={filterPopover}>Filter</Button>
            <Input fullWidth value={searchInput} onChange={inputType} />
            <Button onClick={hideButton} color="secondary">
                Hide
            </Button>
            <Button onClick={resetButton}>Reset</Button>
        </div>
    );

    function filterPopover(e) {
        return controlPopover(e.currentTarget);
    }

    function inputType(e) {
        const {
            target: { value },
        } = e;
        return typeSearch(value);
    }

    function hideButton(_e) {
        return doHideButton(prev => !prev);
    }

    function resetButton() {
        typeSearch('');
        return doTags([]);
    }
};

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
            else tagState = [...tagState, value];
            return tagState;
        });
    }
};

export default withStyles(styles)(SearchBar);
