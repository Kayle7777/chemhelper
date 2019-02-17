import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({});

const TopicNavSelect = props => {
    const { topicNames, topicState } = props;
    //eslint-disable-next-line
    const [topic, changeTopic] = topicState;
    return (
        <span>
            {topicNames.map(name => {
                return (
                    <Button onClick={topicClick} size="small" variant="outlined" key={`${name}_button`} value={name}>
                        {name}
                    </Button>
                );
            })}
        </span>
    );

    function topicClick(e) {
        const {
            currentTarget: { value },
        } = e;
        return changeTopic(value);
    }
};

export default withStyles(styles)(TopicNavSelect);
