import React from 'react';
import Main from '../pages/Main.js';
import { render, fireEvent, waitForElement, waitForDomChange } from 'react-testing-library';

describe('Testing Main JS search and tags', () => {
    const testUtils = render(<Main />);
    const [filterButton, searchBar, hideButton, resetButton] = testUtils.getByTestId('searchbar').children;

    test('Can we see the search bar', () => {
        expect(filterButton.textContent).toBe('Filter');
    });

    test('Can we open and close the tag filter', async () => {
        fireEvent.click(filterButton);
        await waitForElement(() => [
            expect(testUtils.getByText('Filter by Tags').textContent).toBe('Filter by Tags'),
            expect(testUtils.getByText('Bleeding').textContent).toBe('Bleeding'),
        ]);
    });

    test('Can we see the chemtable', () => {
        expect(testUtils.getByText('Aluminium').textContent).toBe('Aluminium');
    });

    test('Can we perform a name search', async () => {
        expect(testUtils.getByText('Aluminium').textContent).toBeTruthy();
        fireEvent.keyPress(searchBar, { key: 's' });
        await waitForDomChange(() => [
            expect(testUtils.getByText('Aluminium')).toBeUndefined(),
            expect(testUtils.getByText('Synthflesh').textContent).toBe('Synthflesh'),
        ]);
        console.log(testUtils.getByText('Aluminium'));
        // fireEvent.click(resetButton);
        // await waitForElement(() => [expect(testUtils.getByText('Aluminium').textContent).toBe('Aluminium')]);
    });

    test('Does the hide button work', async () => {
        fireEvent.click(hideButton);
        await waitForElement(() => [expect(testUtils.getByTestId('showsearch').innerHTML).toContain('Show Search')]);
    });
});
