import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    drag: {
        position: 'absolute',
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
            <div className={classes.drag} style={containerStyles}>
                {props.children}
            </div>
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
            tf.pos = imgCoords(clientX, clientY, tf.initialCoords);
            return tf;
        });
    }
};

export default withStyles(styles)(Draggable);
