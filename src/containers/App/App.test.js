import React, { useState as useStateMock } from 'react'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '.'
import { store } from '../../store'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

// jest.mock('../Home', () => jest.fn(() => <home data-testid='home-page'/>))

const AppComponent = (
  <Provider store={store}>
    <App  />
  </Provider>
)

describe('App', () => {
  const setSelectedArticleFn = jest.fn()
  beforeEach(() => {
    useStateMock.mockImplementation(() => [undefined, setSelectedArticleFn])
  })
  afterEach(cleanup)
  test('Should match snapshot', () => {
    const { asFragment } = render(AppComponent)
    expect(asFragment).toMatchSnapshot()
  })
  test('Should show home page', () => {
    const { getByTestId } = render(AppComponent)
    expect(getByTestId('home-page')).toBeInTheDocument()
  })
  test('Should show detail page when have selectedArticle', () => {
    useStateMock.mockImplementation(() => ['selectedArticle', setSelectedArticleFn])
    const { getByTestId } = render(AppComponent)
    expect(getByTestId('detail-page')).toBeInTheDocument()
  })
})
