import { render, cleanup } from '@testing-library/react'
import DetailPage from '.'

const DetailPageComponent = (
  <DetailPage article={{url: 'mock url', id: '01'}} />
)

describe('Detail Page', () => {
  afterEach(cleanup)
  test('Should match snapshot', () => {
    const { asFragment } = render(DetailPageComponent)
    expect(asFragment).toMatchSnapshot()
  })

  test('Should have iframe in detail page', () => {
    const { getByTestId } = render(DetailPageComponent)
    expect(getByTestId('iframe')).toBeInTheDocument()
  })
})

