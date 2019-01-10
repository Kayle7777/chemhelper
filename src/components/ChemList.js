import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const styles = theme => ({
    card: {
        overflowY: 'auto',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing.unit * 2,
        },
    },
});

const ChemList = props => {
    const { classes, recipes } = props;
    return (
        <Paper className={classes.card}>
            <List>
                {recipes.map(recipe => (
                    <ListItem
                        button
                        key={`${recipe.name}_${recipe.ingredients ? recipe.ingredients.toString() : 'no_ingredients'}`}
                    >
                        <ListItemText>{recipe.name}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default withStyles(styles)(ChemList);
