import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<
  void, void, ThunkConfig<string>
>(
  'ArticlesPage/initArticlesPage',
  async (_, { getState, dispatch }) => {
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({ page: 1 }));
    }
  },
);