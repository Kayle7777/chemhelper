import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import InfoPanel from '../components/InfoPanel';
import ItemTable from '../components/ItemTable';
import TagCollapse from '../components/TagCollapse';
import TopicNavSelect from '../components/TopicNavSelect';
import Recipes from '../utils/recipes.yaml';
// import Recipes from '../utils/recipes.json';
// eslint-disable-next-line
import Construction from '../utils/construction.yaml';

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
    //eslint-disable-next-line
    const [topic, changeTopic] = useState('chemistry');
    const [hideButton, doHideButton] = useState(true);
    const [searchInput, typeSearch] = useState('');
    const [tagState, doTags] = useState([]);
    const [collapseIn, doCollapse] = useState(false);

    // This is current stuff not changed yet
    const { tags, recipes } = Recipes;
    const filteredRecipes = filterRecipes(recipes, searchInput, tagState);
    const [selectedChem, controlSelectChem] = useState(filteredRecipes[0]);
    return (
        <>
            <AppBar />
            <div className={classes.container}>
                {hideButton && (
                    <div className={classes.leftContainer}>
                        <TopicNavSelect />
                        <SearchBar
                            tagState={[tagState, doTags]}
                            doHideButton={doHideButton}
                            inputState={[searchInput, typeSearch]}
                        />
                        <TagCollapse tagStatePassed={[tagState, doTags]} tags={tags} open={collapseIn} />
                        <div className={classes.recipeBox}>
                            <ItemTable
                                collapseState={[collapseIn, doCollapse]}
                                recipes={filteredRecipes}
                                chemState={[selectedChem, controlSelectChem]}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.infoPanel}>
                    {!hideButton && (
                        <Button
                            data-testid="showsearch"
                            fullWidth
                            onClick={() => doHideButton(hide => !hide)}
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

    function filterRecipes(recipes, searchInput, stateTags) {
        return recipes.filter(recipe => {
            const { name, tags: recipeTagsList } = recipe;
            return checkMatchingInput(searchInput, name) && checkMatchingTags(stateTags, recipeTagsList);
        });

        function checkMatchingInput(searchInput, name) {
            if (!searchInput) return true;
            else return name.toLowerCase().includes(searchInput.toLowerCase());
        }

        function checkMatchingTags(stateTags, recipeTagsList) {
            if (!stateTags.length) return true;
            if (!recipeTagsList) return false;
            else return stateTags.every(stateTag => recipeTagsList.some(recipeTag => recipeTag === stateTag));
        }
    }
};

export default withStyles(styles)(Main);
