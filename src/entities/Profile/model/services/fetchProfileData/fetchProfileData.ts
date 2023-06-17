import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
  Profile, undefined, ThunkConfig<string>
>(
  'login/loginByUsername',
  async (_, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.post<Profile>('/profile');

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);