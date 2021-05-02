import { createAsyncThunk } from '@reduxjs/toolkit'
import request, { GETOption } from '../../../utils/request'
import { ARTICLE_URL, APP_KEY } from '../../../utils/api-const' 

export const getMostPopularArticle = createAsyncThunk(
  'article/getMostPopularArticle',
  async (period) => {
    const response = await request(`${ARTICLE_URL}/${period}.json?${APP_KEY}`, GETOption())
    return response
  }
)