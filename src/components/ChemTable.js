import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
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
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    paperContainer: {},
});

const ChemTable = props => {
    const { recipes, chemState } = props;
    const [selectedChem, controlSelectChem] = chemState;
    const [orderBy, changeOrder] = useState({ name: 'name', direction: true });
    return (
        <AutoSizer>
            {({ width, height }) => (
                <Paper>
                    <MuiTable
                        data-testid="autosizer-table"
                        data={recipeSort(recipes, orderBy)}
                        columns={[
                            {
                                name: 'name',
                                header: 'Chemical',
                            },
                        ]}
                        fitHeightToRows
                        orderBy={orderBy.name}
                        fixedRowCount={1}
                        isCellSelected={(_column, rowData) => rowData === selectedChem}
                        isCellHovered={(_column, rowData, _hoveredColumn, hoveredRowData) =>
                            rowData !== undefined && rowData.id && rowData.id === hoveredRowData.id
                        }
                        orderDirection={orderBy.direction ? 'desc' : 'asc'}
                        onCellClick={cellClick}
                        onHeaderClick={headerClick}
                        includeHeaders={true}
                        width={width}
                        height={height}
                    />
                </Paper>
            )}
        </AutoSizer>
    );

    function cellClick(column, cell) {
        return controlSelectChem(cell);
    }

    function headerClick(header) {
        return changeOrder(orderBy => {
            orderBy.name = header.name;
            orderBy.direction = !orderBy.direction;
            return orderBy;
        });
    }

    function recipeSort(recipes, orderBy) {
        const sortDir = orderBy.direction ? -1 : 1;
        return recipes
            .sort((a, b) => {
                const nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();
                if (nameA < nameB) return sortDir;
                if (nameA > nameB) return -sortDir;
                return 0;
            })
            .map((e, i) => {
                e.id = i + 1;
                return e;
            });
    }
};

export default withStyles(styles)(ChemTable);
