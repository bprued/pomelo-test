import { useState } from 'react'
import NavBar from '../../components/NavBar'
import HomePage from '../Home'
import DetailPage from '../Detail'
import { AppStyled, ContainerStyled } from './styled.js'

const App = () => {
  const [selectedArticle, setSelectedArticle] = useState()

  const renderPage = () => {
    let page = <HomePage setSelectedArticle={setSelectedArticle} />
    if(selectedArticle) {
      page = <DetailPage article={selectedArticle}/>
    } 
    return page
  }

  return (
    <AppStyled>
      <NavBar article={selectedArticle} setArticle={setSelectedArticle}/>
      <ContainerStyled>
        {renderPage()}
      </ContainerStyled>
    </AppStyled>
  );
}

export default App;
