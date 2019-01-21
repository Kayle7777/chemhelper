import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MuiTable from 'mui-virtualized-table';
import { AutoSizer } from 'react-virtualized';

const styles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '7px',
            height: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            '-webkit-border-radius': '100px',
        },
        '*::-webkit-scrollbar:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.09)',
        },
        '*::-webkit-scrollbar-thumb:vertical': {
            background: 'rgba(0, 0, 0, 0.5)',
            '-webkit-border-radius': '100px',
        },
        '*::-webkit-scrollbar-thumb:vertical:active': {
            background: 'rgba(0, 0, 0, 0.61)',
            '-webkit-border-radius': '100px',
        },
    },
});

const ChemTable = props => {
    const { recipes } = props;
    return (
        <AutoSizer>
            {({ width, height }) => (
                <MuiTable
                    data-testid="autosizer-table"
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
