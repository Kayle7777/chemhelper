import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, Switch, FormControlLabel } from '@material-ui/core';
import { ToggleContext } from '../App';

const styles = theme => ({
    root: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    container: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            width: 1024 - theme.spacing.unit * 6,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1140,
        },
        [theme.breakpoints.up('xl')]: {
            width: 1750,
        },
    },
    text: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    content: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
    },
    nightModeSwitch: {
        position: 'absolute',
        right: 0,
    },
});

const AppBar = props => {
    const { classes } = props;
    const [paletteType, toggleType] = useContext(ToggleContext);
    return (
        <MuiAppBar className={classes.root} position="static">
            <Toolbar className={classes.container} variant="dense">
                <div className={classes.content}>
                    <Typography className={classes.text} variant="h5">
                        ChemHelper
                    </Typography>
                    <Typography
                        className={classes.text}
                        variant="subtitle1"
                        style={{ transform: `translate(0px, 6px)` }}
                    >
                        A chemistry helper app for Space Station 13 Goonstation
                    </Typography>
                </div>
                <FormControlLabel
                    className={classes.nightModeSwitch}
                    color="primary"
                    control={
                        <Switch checked={paletteType} onChange={() => toggleType(!paletteType)} value={paletteType} />
                    }
                    label="Night Mode"
                />
            </Toolbar>
        </MuiAppBar>
    );
};

export default withStyles(styles)(AppBar);
