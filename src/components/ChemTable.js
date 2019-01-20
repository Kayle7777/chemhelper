import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiTable from 'mui-virtualized-table';
import { AutoSizer } from 'react-virtualized';

const styles = theme => ({
    card: {
        overflowY: 'auto',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
        },
    },
});

const ChemTable = props => {
    const { classes, recipes } = props;
    console.log(
        recipes.map((e, i) => {
            e.id = i + 1;
            return e;
        })
    );
    return (
        <MuiTable
            className={classes.card}
            data={recipes.map((e, i) => {
                e.id = i + 1;
                return e;
            })}
            columns={[{ name: 'id' }, { name: 'name' }, { name: 'sources' }]}
            width={1000}
        />
    );
};

export default withStyles(styles)(ChemTable);
