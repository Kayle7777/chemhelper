import React from 'react';
import Main from '../pages/Main.js';
import { render, fireEvent, waitForElement, waitForDomChange, cleanup } from 'react-testing-library';

describe('testing Main.js search and tags', () => {
    const { getByTestId, getByText, queryByText, queryByTestId } = render(<Main />);
    const [filterButton, searchBar, resetButton, hideButton] = getByTestId('searchbar').children;

    test('should see the search bar', () => {
        expect(filterButton.textContent).toBe('Tags');
        expect(searchBar).toBeTruthy();
    });

    describe('testing the hide and show search buttons', () => {
        test('should click hide button and not see chemtable, see show search button', async () => {
            expect(getByText(/acetone/i).textContent).toBeTruthy();
            expect(queryByText(/show search/i)).toBe(null);
            fireEvent.click(hideButton);
            await waitForElement(() => [getByText(/show search/i)]);
            expect(getByText(/show search/i).textContent).toBeTruthy();
            expect(queryByText(/acetone/i)).toBe(null);
        });

        test('should see only show search button, click it and see chemtable', async () => {
            expect(getByText(/show search/i).textContent).toBeTruthy();
            expect(queryByText(/acetone/i)).toBe(null);
            fireEvent.click(getByText(/show search/i));
            await waitForElement(() => [getByText(/acetone/i)]);
            expect(getByText(/acetone/i).textContent).toBeTruthy();
            expect(queryByText(/show search/i)).toBe(null);
        });
    });

    test('should perform a search in searchBar', () => {
        const input = searchBar.firstChild;

        expect(getByText(/acetone/i).textContent).toBeTruthy();
        expect(input.value).toBe('');
        fireEvent.change(input, { target: { value: 's ' } });
        expect(input.value).toBe('s ');
        // Need to wait here. ARG
    });
});
