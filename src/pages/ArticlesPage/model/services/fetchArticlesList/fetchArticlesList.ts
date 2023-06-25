import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
  Article[], void, ThunkConfig<string>
>(
  'ArticlesPage/fetchArticlesList',
  async (_, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
        },
      });

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);