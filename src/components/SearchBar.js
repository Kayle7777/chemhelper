import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

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
    const { classes, doHideButton, inputState, tagState } = props;
    const [searchInput, typeSearch] = inputState;
    // eslint-disable-next-line
    const [tagStates, doTags] = tagState;

    return (
        <div className={classes.container} data-testid="searchbar">
            {/* <Tooltip title="Filter by Tags" placement="top">
                    <Button className={classes.tagSearchButton} variant="outlined" onClick={filterCollapse}>
                        Tags
                    </Button>
                </Tooltip> */}
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

    function inputType(e) {
        let {
            target: { value },
        } = e;
        value = value.replace(/bee/g, '🐝');
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
