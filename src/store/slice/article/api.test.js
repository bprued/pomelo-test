import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
    ARTICLE_URL,
    APP_KEY
} from '../../../utils/api-const'
import { store } from '../../../store'
import { getMostPopularArticle } from './api'

const mock = new MockAdapter(axios)

describe('Article api', () => {
  const response = {}
  it('should call succeeded', async () => {
    mock.onGet(`${ARTICLE_URL}/1.json?${APP_KEY}`).reply(200, response)
    const result = await store.dispatch(getMostPopularArticle(1))
    expect(result.payload).toEqual(response)
  })
  it('should call failed', async () => {
    mock.onGet(`${ARTICLE_URL}/1.json?${APP_KEY}`).reply(400)
    const result = await store.dispatch(getMostPopularArticle())
    expect(result.payload).toEqual(undefined)
  })
})
