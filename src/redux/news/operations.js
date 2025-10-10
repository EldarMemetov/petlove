import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';

export const fetchAll = createAsyncThunk(
  'news/fetchNews',
  async ({ keyword = '', page = 1, limit = 6 } = {}, thunkAPI) => {
    try {
      const query = keyword.trim() || 'news';

      const response = await axios.get('/articlesearch.json', {
        params: {
          q: query,
          page: page - 1,
          'api-key': API_KEY,
        },
      });

      const results = response.data?.response?.docs ?? [];
      const totalHits = response.data?.response?.meta?.hits ?? 0;

      console.log('Keyword:', query, 'Total hits:', totalHits);

      return {
        results,
        totalPages: Math.ceil(totalHits / limit),
      };
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Too many requests. Please wait a few seconds.');
      } else if (error.response?.status === 403) {
        toast.error('Invalid or expired API key.');
      } else {
        toast.error('Failed to load news. Please try again later.');
      }

      return thunkAPI.rejectWithValue(error.message || 'Error fetching news');
    }
  }
);

export const fetchId = createAsyncThunk(
  'news/idNews',
  async ({ id }, thunkAPI) => {
    try {
      if (!id) {
        return thunkAPI.rejectWithValue('Missing article ID');
      }

      const response = await axios.get('/articlesearch.json', {
        params: {
          fq: `_id:"${id}"`,
          'api-key': API_KEY,
        },
      });

      const article = response.data?.response?.docs[0] ?? null;

      if (!article) {
        toast.error('Article not found.');
        return null;
      }

      toast.success('News details loaded successfully!');
      return article;
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Too many requests. Please wait a few seconds.');
      } else {
        toast.error('Failed to load news details. Please try again later.');
      }

      return thunkAPI.rejectWithValue(
        error.message || 'Error fetching news details'
      );
    }
  }
);
