import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[], string | undefined, ThunkConfig<string>
>(
  'some/fetchCommentsByArticleId',
  async (articleId, { rejectWithValue, extra: { api } }) => {
    if (!articleId) {
      return rejectWithValue('error');
    }

    try {
      const response = await api.get<Comment[]>('/comments', {
        params: {
          articleId,
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