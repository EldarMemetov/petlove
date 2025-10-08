import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_KEY = 'euxrWiUMGGwEq8ntkPM7yOaHLL4RtsZw';
axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';

export const fetchAll = createAsyncThunk(
  'news/fetchNews',
  async ({ keyword = '', page = 1, limit = 6 } = {}, thunkAPI) => {
    try {
      const response = await axios.get('/articlesearch.json', {
        params: {
          q: keyword,
          page: page - 1,
          'api-key': API_KEY,
        },
      });

      return {
        results: response.data?.response?.docs ?? [],
        totalPages: Math.ceil(
          (response.data?.response?.meta?.hits || 0) / limit
        ),
      };
    } catch (error) {
      toast.error('Failed to load news. Please try again later.');
      return thunkAPI.rejectWithValue(error.message || 'Error fetching news');
    }
  }
);

export const fetchId = createAsyncThunk(
  'news/idNews',
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.get('/articlesearch.json', {
        params: {
          fq: `_id:"${id}"`,
          'api-key': API_KEY,
        },
      });
      toast.success('News details loaded successfully!');
      return response.data?.response?.docs[0] ?? null;
    } catch (error) {
      toast.error('Failed to load news details. Please try again later.');
      return thunkAPI.rejectWithValue(
        error.message || 'Error fetching news details'
      );
    }
  }
);
