import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api')

const data = {
  count: Date.now(),
  next: 'nextUrl',
  previous: null,
  results: [{
    name: 'name'
  }]
}
const nextData = {
  count: Date.now(),
  next: 'nextUrl',
  previous: 'prevUrl',
  results: [{
    name: 'nextName'
  }]
}
const prevData = {
  count: Date.now(),
  next: 'nextUrl',
  previous: 'prevUrl',
  results: [{
    name: 'prevName'
  }]
}

test('Characters render', async () => {
  mockGetData.mockResolvedValue(data);

  render(<StarWarsCharacters/>)

  await wait()
})

test('Next button renders new characters', async () => {
  await wait(() => mockGetData.mockResolvedValue(data))
  const { getByText } = render(<StarWarsCharacters/>)
  const nextButton = getByText(/next/i)
  
  await wait(() => mockGetData.mockResolvedValue(nextData))

  await wait(() => fireEvent.click(nextButton))
  await wait(() => expect(mockGetData).toHaveBeenCalledTimes(2))
})

// Things to test
// Are the buttons rendered?
// Is the picture rendered?
// Did loading state change?
// Did characterList render?
// Did characterList update after clicking next button?
// Did characterList update after clicking previous button?
// Did characterList stay the same after clicking previous with initial data?
