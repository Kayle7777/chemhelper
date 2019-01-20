import React from 'react';
import { render } from 'react-testing-library';
import ChemTable from '../components/ChemTable';
describe('what is wrong with this damn component', () => {
    const utils = render(<ChemTable recipes={[{ id: 1, name: 'test', sources: ['nothing'] }]} />);
    test('why wont it render', () => {});
});
