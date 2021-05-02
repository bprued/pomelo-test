import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Dropdown, Icon, Header, Input, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { HomeStyled } from './styled'
import { getMostPopularArticle } from '../../store/slice/article/api'
import { selectArticleList } from '../../store/slice/article'

const periodOptions = [
  { key: '1', text: 'Today', value: '1' },
  { key: '7', text: 'This week', value: '7' },
  { key: '30', text: 'This month', value: '30' }
]

const HomePage = ({setSelectedArticle}) => {
  const articleListState = useSelector(selectArticleList)
  const dispatch = useDispatch()
  const [period, setPeriod] = useState(periodOptions[0].value)
  const [articleList, setArticleList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(getMostPopularArticle(period))
  }, [period, dispatch])

  useEffect(() => {
    if(articleListState.status === 'succeeded') {
      setArticleList(articleListState.data.results)
    }
  }, [articleListState.status, articleListState.data.results])

  const getCard = (list) => {
    if(list.length > 0) {
      return (
        list.map((article) => (
          <Card key={article.id} onClick={() => setSelectedArticle(article)}>
            <Card.Content>
              <Card.Header  data-testid={`title-${article.id}`}>
                {article.title}
              </Card.Header>
              <Card.Meta>{article.published_date}</Card.Meta>
              <Card.Description>{article.abstract}</Card.Description>
            </Card.Content>
          </Card>
        ))
      )
    } else {
      return <div className='not-found'>No Articles Found</div>
    }
  }

  const getList = () => (
    searchList?.length > 0 || query?.length > 0? searchList : articleList
  )

  const getContent = () => {
    let list = getList()
    if(articleListState.status !== 'succeeded') {
      return (
        <Segment data-testid='loader'>
          <Dimmer active inverted><Loader inverted content='Loading' /></Dimmer>
        </Segment>
      )
    } else {
      return (
        <Card.Group>
          {getCard(list)}
        </Card.Group>
      )
    }
  }

  const handlePeriodChange = (e, { value }) => {
    setPeriod(value)
  }

  const getPeriodSelect = () => (
    <Header as='h4'>
      <Icon name='star' />
      <Header.Content>
        Most Popular Articles by {' '}
        <Dropdown
          options={periodOptions}
          defaultValue={period}
          onChange={handlePeriodChange}
        />
      </Header.Content>
    </Header>
  )

  const getHeader = () => (
    <div className='home-header'>
      <div>
        {getPeriodSelect()}
      </div>
      <div>
        <Input
          data-testid='search-box'
          icon='search'
          placeholder='Search article by title'
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )

  const handleSearchChange = (e, data) => {
    setQuery(data.value)
    setSearchList(articleList.filter((article) => (
      article.title.toLowerCase().includes(data.value.toLowerCase())
    )))
  }

  return (
    <HomeStyled data-testid='home-page'>
      {getHeader()}
      <div className='card-wrapper'>
        {getContent()}
      </div>
    </HomeStyled>
  );
}

export default HomePage;
