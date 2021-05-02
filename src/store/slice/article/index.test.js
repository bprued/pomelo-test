import { store } from '../../../store'
import {
    selectArticleList
} from '.'

describe('Article slice', () => {
  it('should get data correctly', () => {
    expect(selectArticleList(store.getState()))
      .toEqual(store.getState().article.articleList)
  })
})
