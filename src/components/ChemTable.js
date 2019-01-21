import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
    const [orderBy, changeOrder] = useState({ name: 'name', direction: true });
    return (
        <AutoSizer>
            {({ width, height }) => (
                <MuiTable
                    data-testid="autosizer-table"
                    data={recipeSort(
                        recipes.map((e, i) => {
                            e.id = i + 1;
                            return e;
                        }),
                        orderBy
                    )}
                    columns={[
                        {
                            name: 'name',
                            header: 'Chemical',
                        },
                        {
                            name: 'sources',
                        },
                    ]}
                    fitHeightToRows
                    orderBy={orderBy.name}
                    orderDirection={orderBy.direction ? 'desc' : 'asc'}
                    onHeaderClick={headerClick}
                    includeHeaders={true}
                    // fixedRowCount={1}
                    width={width}
                    height={height}
                />
            )}
        </AutoSizer>
    );

    function headerClick(header) {
        return changeOrder(orderBy => {
            orderBy.name = header.name;
            orderBy.direction = !orderBy.direction;
            return orderBy;
        });
    }

    function recipeSort(recipes, orderBy) {
        const sortDir = orderBy.direction ? -1 : 1;
        return recipes.sort((a, b) => {
            const nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) return sortDir;
            if (nameA > nameB) return -sortDir;
            return 0;
        });
    }
};

export default withStyles(styles)(ChemTable);
