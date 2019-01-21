import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: 200,
        height: 200,
    },
});

const Draggable = props => {
    const { classes } = props;
    const [tf, transform] = useState({
        initialCoords: [0, 0],
        pos: [0, 0],
    });
    const [clickedDown, toggleClick] = useState(false);

    const containerStyles = {
        left: `${tf.pos[0]}px`,
        top: `${tf.pos[1]}px`,
    };

    return (
        <>
            {!props.children && (
                <Paper
                    className={classes.paper}
                    style={containerStyles}
                    onMouseMove={mouseMove}
                    onMouseDown={mouseDown}
                    onMouseUp={() => toggleClick(false)}
                    onMouseLeave={() => toggleClick(false)}
                />
            )}
            {props.children && props.children}
        </>
    );

    function imgCoords(x, y, pos = tf.pos) {
        return [x - pos[0], y - pos[1]];
    }

    function mouseDown(e) {
        toggleClick(!clickedDown);
        const { clientX, clientY } = e;
        return transform(prev => {
            tf.initialCoords = imgCoords(clientX, clientY);
            return tf;
        });
    }
    function mouseMove(e) {
        if (!clickedDown) return;
        const { clientX, clientY } = e;
        return transform(prev => {
            console.log(imgCoords(clientX, clientY, tf.initialCoords));
            tf.pos = imgCoords(clientX, clientY, tf.initialCoords);
            return tf;
        });
    }
};

export default withStyles(styles)(Draggable);
