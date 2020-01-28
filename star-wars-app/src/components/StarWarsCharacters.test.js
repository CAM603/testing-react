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

// Why automated testing is important:
// Manual testing takes a lot of time so automated testing will save time and money. Automated testing can be run over and over again during the development process to ensure everything is working as it should and catches bugs much easier than manually looking for them
// Website: https://www.netflix.com/
// Things to test:
// 1: Example components render
// 2: Sign in button takes you to login page
// 3: Background image is rendered
// 4: Can't click "try 30 days free" button without providing an email
// 5: Clicking any FAQ will close a previously clicked FAQ 
