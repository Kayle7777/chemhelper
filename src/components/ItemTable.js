import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Toolbar, Typography, IconButton } from '@material-ui/core';
import { FilterList as FilterListIcon } from '@material-ui/icons';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import MuiTable from 'mui-virtualized-table';
import { AutoSizer } from 'react-virtualized';
import TopicNavSelect from './TopicNavSelect';

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
    root: {
        flexGrow: 1,
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
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flexGrow: 1,
    },
    dropdown: {
        flex: '0 0 auto',
    },
    navSelectGrow: {
        flexGrow: 1,
    },
    menuTag: {
        paddingRight: '1rem',
    },
});

const ItemTable = props => {
    const { classes, recipes, chemState, collapseState, topicState } = props;
    const [selectedChem, controlSelectChem] = chemState;
    const [orderBy, changeOrder] = useState({ name: 'name', direction: true });
    const [hovered, mouseOver] = useState(false);
    const [collapseIn, doCollapse] = collapseState;
    const [topic, changeTopic] = topicState;

    return (
        <>
            <div className={classes.root}>
                <Toolbar>
                    <span className={classes.title}>
                        <TopicNavSelect
                            topicNames={'All, Chemistry, Cocktails, Construction, Food, Objects, Workbench'
                                .toLowerCase()
                                .split(', ')}
                            topicState={[topic, changeTopic]}
                        />
                    </span>
                    <Typography className={classes.menuTag} variant="body1">
                        Filter by tag
                    </Typography>
                    <IconButton aria-label="Filter List" onClick={filterCollapse}>
                        <FilterListIcon />
                    </IconButton>
                </Toolbar>
            </div>

            <AutoSizer>
                {({ width, height }) => (
                    <Paper
                        onKeyDown={arrowMove}
                        onMouseEnter={() => mouseOver(true)}
                        onMouseLeave={() => mouseOver(false)}
                    >
                        <MuiTable
                            data-testid="chemtable"
                            data={recipeSort(recipes, orderBy)}
                            columns={[
                                {
                                    name: 'name',
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
                            width={width || 100}
                            height={height || 100}
                        />
                    </Paper>
                )}
            </AutoSizer>
        </>
    );

    function arrowMove(e) {
        if (!hovered) return;
        const { key } = e;
        // e.preventDefault();
        if (key === 'ArrowUp') return controlSelectChem(findChemById(selectedChem.id - 1));
        if (key === 'ArrowDown') return controlSelectChem(findChemById(selectedChem.id + 1));

        function findChemById(id, arr = recipes) {
            if (id < 1) return arr[0];
            if (id > arr.length - 1) return arr[arr.length - 1];
            for (let i = 0; i < arr.length; i++) {
                if (id === arr[i].id) return arr[i];
            }
        }
    }

    function filterCollapse() {
        return doCollapse(!collapseIn);
    }

    function cellClick(_column, cell) {
        return controlSelectChem(cell);
    }

    function headerClick(header) {
        return changeOrder(orderBy => ({ ...orderBy, name: header.name, direction: !orderBy.direction }));
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

export default withStyles(styles)(ItemTable);
