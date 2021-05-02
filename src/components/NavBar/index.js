import { Icon, Menu, Button } from 'semantic-ui-react'
import { NavBarStyled } from './styled'

const NavBar = ({article, setArticle}) => {
  const getBackToHome = () => {
    if(article) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item name='home'>
            <Button icon onClick={() => setArticle()} data-testid="home-button">
              <Icon name='home' />
            </Button>
          </Menu.Item>
        </Menu.Menu>
      )
    }
  }

  return (
    <NavBarStyled>
      <Menu attached='top'>
        <div onClick={() => setArticle()}>
          <img data-testid='logo' alt='logo' src='https://developer.nytimes.com/files/poweredby_nytimes_200c.png?v=1583354208354' />
        </div>      
        {getBackToHome()}
      </Menu>
    </NavBarStyled>
  );
}

export default NavBar;
