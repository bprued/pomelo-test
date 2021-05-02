import { render, cleanup, fireEvent } from '@testing-library/react'
import NavBar from '.'

const setArticleFn = jest.fn()
const NavBarComponent = (article) => (
  <NavBar article={article} setArticle={setArticleFn}/>
)

describe('NavBar Component', () => {
  afterEach(cleanup)
  test('Should match snapshot', () => {
    const { asFragment } = render(NavBarComponent())
    expect(asFragment).toMatchSnapshot()
  })
  test('Should show logo', () => {
    const { getByTestId } = render(NavBarComponent())
    expect(getByTestId('logo')).toBeInTheDocument()
  })
  test('Should show home button when have article prop', () => {
    const { getByTestId } = render(NavBarComponent('article'))
    expect(getByTestId('home-button')).toBeInTheDocument()
  })
  test('Should not show home button after click on logo', () => {
    const { queryByTestId } = render(NavBarComponent())
    fireEvent.click(queryByTestId('logo'))
    expect(queryByTestId('home-button')).not.toBeInTheDocument()
  })
  test('Should call setArticle with () after click on home button', () => {
    const { queryByTestId } = render(NavBarComponent('article'))
    fireEvent.click(queryByTestId('home-button'))
    expect(setArticleFn).toHaveBeenCalledWith()
  })
})
