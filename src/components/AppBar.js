import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';

const AppBar = props => {
    const { classes } = props;
    const { root, container } = classes;
    return (
        <div className={root}>
            <MuiAppBar position="static">
                <Toolbar variant="dense">
                    <div className={container}>
                        <Typography align="center">Breakpoints are c00l</Typography>
                    </div>
                </Toolbar>
            </MuiAppBar>
        </div>
    );
};

export default AppBar;
