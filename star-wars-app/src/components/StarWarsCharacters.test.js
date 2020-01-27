import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api/getData';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api')

test('Something happens', async () => {
    // mockGetData.mockResolvedValueOnce([{
    //     name: "Luke Skywalker",
    //     height: "172",
    //     mass: "77",
    //     hair_color: "blond",
    //     skin_color: "fair",
    //     eye_color: "blue",
    //     birth_year: "19BBY",
    //     gender: "male",
    //     homeworld: "https://swapi.co/api/planets/1/"
    // }])

    const { getByText } = render(<StarWarsCharacters/>);

    const nextButton = getByText(/next/i)

    fireEvent.click(nextButton);

    wait(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1)
    })
})