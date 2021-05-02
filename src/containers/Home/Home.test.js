import { render, cleanup, fireEvent } from '@testing-library/react'
import HomePage from '.'
import { selectArticleList } from '../../store/slice/article'

jest.mock('react-redux', () => ({
  useSelector: (cb) => cb(),
  useDispatch: () => jest.fn()
}))

jest.mock('../../store/slice/article', () => ({
  selectArticleList: jest.fn()
}))

const setSelectedArticleFn = jest.fn()

const HomePageComponent = (
  <HomePage setSelectedArticle={setSelectedArticleFn} />
)

let articleListState = { 
  status: 'status',
  data: [] 
}
selectArticleList.mockReturnValue(articleListState)

describe('Home Page', () => {
  beforeEach(() => {
    selectArticleList.mockReturnValue(articleListState)
  })
  afterEach(() => {
    cleanup
    selectArticleList.mockReturnValue(articleListState)
    jest.clearAllMocks()
  })
  test('Should match snapshot', () => {
    const { asFragment } = render(HomePageComponent)
    expect(asFragment).toMatchSnapshot()
  })
  test('Should show loader when get list not succeeded', () => {
    const { getByTestId } = render(HomePageComponent)
    expect(getByTestId('loader')).toBeInTheDocument()
  })
  test('Should show article list when get list succeeded', () => {
    articleListState = { 
      status: 'succeeded',
      data: {
        results: [
          {
            id: '01',
            title: 'test',
            abstract: 'test article'
          }
        ]
      } 
    }
    selectArticleList.mockReturnValue(articleListState)
    const { getByText } = render(HomePageComponent)
    expect(getByText('test')).toBeInTheDocument()
  })
  test('Should call setSelectedArticle when click on article', () => {
    let mockArticle = {
      id: '01',
      title: 'test',
      abstract: 'test article'
    }
    articleListState = { 
      status: 'succeeded',
      data: {
        results: [mockArticle]
      } 
    }
    selectArticleList.mockReturnValue(articleListState)
    const { getByText } = render(HomePageComponent)
    fireEvent.click(getByText('test'))
    expect(setSelectedArticleFn).toHaveBeenLastCalledWith(mockArticle)
  })
  test('Should show not found text when search not found', () => {
    const { getByText, getByRole } = render(HomePageComponent)
    fireEvent.change(getByRole('textbox'),{ target: { value: 'test message' } })
    expect(getByText('No Articles Found')).toBeInTheDocument()
  })
})