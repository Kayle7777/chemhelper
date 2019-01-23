import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Input, Tooltip } from '@material-ui/core';
import TagPopover from './TagPopover';

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
    tagSearchButton: {
        marginRight: theme.spacing.unit,
    },
    inputNoText: {
        fontStyle: 'italic',
    },
});

const SearchBar = props => {
    const { classes, doHideButton, tags, inputState, tagState } = props;
    const [popoverAnchor, controlPopover] = useState(null);
    const [searchInput, typeSearch] = inputState;
    const [tagStates, doTags] = tagState;

    return (
        <div className={classes.container} data-testid="searchbar">
            <TagPopover tagStatePassed={tagState} tags={tags} anchorState={[popoverAnchor, controlPopover]} />
            <Tooltip title="Filter by Tags" placement="top">
                <Button className={classes.tagSearchButton} variant="outlined" onClick={filterPopover}>
                    Tags
                </Button>
            </Tooltip>
            <Input
                className={!searchInput ? classes.inputNoText : ''}
                placeholder="Search by name"
                fullWidth
                value={searchInput}
                onChange={inputType}
            />
            <Button onClick={resetButton}>Reset</Button>
            <Button onClick={hideButton} color="secondary">
                Hide
            </Button>
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

export default withStyles(styles)(SearchBar);
