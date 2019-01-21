import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import ChemTable from '../components/ChemTable';
import Recipes from '../utils/recipes.json';

describe('testing React MUI Autosizing table', () => {
    const utils = render(<ChemTable recipes={Recipes.recipes} />);
    test('click it to give focus', () => {
        const findTable = utils.getByTestId('autosizer-table');
        // fireEvent.scroll(findTable, { y: -100 });
        // expect(utils.getByText('Aluminium')).toBe('Aluminium');
    });
});
