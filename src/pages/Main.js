import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import InfoPanel from '../components/InfoPanel';
import ChemTable from '../components/ChemTable';
import Recipes from '../utils/recipes';
const { tags, recipes } = Recipes;

const styles = theme => ({
    container: {
        margin: 'auto',
        height: '80vh',
        [theme.breakpoints.up('md')]: {
            width: 1140 + theme.spacing.unit * 4,
            display: 'flex',
            marginTop: '2rem',
        },
        [theme.breakpoints.up('xl')]: {
            width: 1750 + theme.spacing.unit * 4,
        },
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            height: '70vh',
        },
    },
    leftContainer: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40%',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 1.5,
        },
        [theme.breakpoints.up('xl')]: {
            width: '25%',
        },
    },
    infoPanel: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit * 1.5,
            marginRight: theme.spacing.unit * 3,
        },
    },
    button: {
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing.unit * 2,
        },
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${theme.spacing.unit * 4}px)`,
            margin: theme.spacing.unit * 2,
        },
    },
    recipeBox: {
        overflowY: 'hidden',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '50vh',
            margin: theme.spacing.unit * 2,
        },
    },
});

const Main = props => {
    const { classes } = props;
    const [hideButton, doHideButton] = useState(true);
    const [searchInput, typeSearch] = useState('');
    const filteredRecipes = filterRecipes(recipes, searchInput);
    const [selectedChem, controlSelectChem] = useState(filteredRecipes[0]);

    return (
        <>
            <AppBar />
            <div className={classes.container}>
                {hideButton && (
                    <div className={classes.leftContainer}>
                        <SearchBar doHideButton={doHideButton} tags={tags} inputState={[searchInput, typeSearch]} />
                        <div className={classes.recipeBox}>
                            <ChemTable recipes={filteredRecipes} chemState={[selectedChem, controlSelectChem]} />
                        </div>
                    </div>
                )}
                <div className={classes.infoPanel}>
                    {!hideButton && (
                        <Button
                            fullWidth
                            onClick={() => doHideButton(prev => !prev)}
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                        >
                            Show Search
                        </Button>
                    )}
                    <InfoPanel content={selectedChem} />
                </div>
            </div>
        </>
    );

    function filterRecipes(recipes, searchInput) {
        if (!searchInput) return recipes;
        recipes = recipes.filter(each => each.name.toLowerCase().includes(searchInput.toLowerCase()));
        // More here to sort via tags from popover in searchBar

        return recipes;
    }
};

export default withStyles(styles)(Main);
