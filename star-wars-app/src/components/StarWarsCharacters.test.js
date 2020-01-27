import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api')

test('Something happens', async () => {

    const { getByText } = render(<StarWarsCharacters/>);

    const nextButton = getByText(/next/i)

    fireEvent.click(nextButton);

    wait(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1)
    })
})