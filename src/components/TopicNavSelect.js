import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({});

const TopicNavSelect = props => {
    const {} = props;
    return (
        <span>
            {['chemistry', 'construction'].map(name => {
                return (
                    <Button size="small" variant="outlined" key={`${name}_button`}>
                        {name}
                    </Button>
                );
            })}
        </span>
    );
};

export default withStyles(styles)(TopicNavSelect);
