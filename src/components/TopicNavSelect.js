import React from 'react';
import { FormControl, Select } from '@material-ui/core';

const TopicNavSelect = props => {
    const { topicNames, topicState } = props;
    //eslint-disable-next-line
    const [topic, changeTopic] = topicState;
    return (
        <FormControl>
            <Select native value={topic} onChange={topicChange} inputProps={{ name: 'topic' }}>
                {topicNames.map(topic => (
                    <option key={`${topic}_dropdown_option`} value={topic}>
                        {topic}
                    </option>
                ))}
            </Select>
        </FormControl>
    );

    function topicChange(e) {
        const {
            currentTarget: { value },
        } = e;
        return changeTopic(value);
    }
};

export default TopicNavSelect;
