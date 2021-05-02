import { createSlice } from '@reduxjs/toolkit'
import { getMostPopularArticle } from './api'

export const ArticleSlice = createSlice({
  name: 'article',
  initialState: {
    articleList: {
      status: 'idle',
      data: []
    }
  },
  extraReducers: {
    [getMostPopularArticle.pending]: (state) => {
      state.articleList.status = 'loading'
    },
    [getMostPopularArticle.fulfilled]: (state, action) => {
      state.articleList.status = 'succeeded'
      state.articleList.data = action.payload
    },
    [getMostPopularArticle.rejected]: (state) => {
      state.articleList.status = 'failed'
      state.articleList.data = []
    },
  }
})

export const selectArticleList = (state) => state.article.articleList

export default ArticleSlice.reducer
