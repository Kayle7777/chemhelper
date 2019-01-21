import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Input, Popover, Card, CardContent } from '@material-ui/core';

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
});

const TagPopover = props => {
    // eslint-disable-next-line
    const { classes, tags, anchorState } = props;
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
            <Card>
                <CardContent>Test</CardContent>
            </Card>
        </Popover>
    );
};

const SearchBar = props => {
    const { classes, doHideButton, tags } = props;
    const [popoverAnchor, controlPopover] = useState(null);
    return (
        <div className={classes.container}>
            <TagPopover classes={classes} tags={tags} anchorState={[popoverAnchor, controlPopover]} />
            <Button onClick={e => controlPopover(e.currentTarget)}>Filter</Button>
            <Input fullWidth />
            <Button onClick={() => doHideButton(prev => !prev)} color="secondary">
                Hide
            </Button>
            <Button>Reset</Button>
        </div>
    );
};

export default withStyles(styles)(SearchBar);
