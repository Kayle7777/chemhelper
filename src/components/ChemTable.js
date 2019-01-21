import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MuiTable from 'mui-virtualized-table';
import { AutoSizer } from 'react-virtualized';

const styles = theme => ({});

const ChemTable = props => {
    const { classes, recipes } = props;
    return (
        <AutoSizer>
            {({ width, height }) => (
                <MuiTable
                    data={recipes.map((e, i) => {
                        e.id = i + 1;
                        return e;
                    })}
                    columns={[
                        { name: 'name', cell: data => <Typography>{data.name}</Typography> },
                        {
                            name: 'sources',
                            cell: data => <Typography>{data.sources ? data.sources.toString() : ''}</Typography>,
                        },
                    ]}
                    width={width}
                    height={height}
                />
            )}
        </AutoSizer>
    );
};

export default withStyles(styles)(ChemTable);
