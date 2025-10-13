import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';

async function fetchNytPage(query, nytPage) {
  const resp = await axios.get('/articlesearch.json', {
    params: {
      q: query,
      page: nytPage,
      'api-key': API_KEY,
    },
  });
  return resp.data;
}

export const fetchAll = createAsyncThunk(
  'news/fetchNews',
  async ({ keyword = '', page = 1, limit = 6 } = {}, thunkAPI) => {
    try {
      if (!API_KEY) {
        toast.error('API key is missing.');
        return thunkAPI.rejectWithValue('Missing API key');
      }

      const query = keyword.trim() || 'news';
      const offset = Math.max(0, (page - 1) * limit);
      const NYT_PAGE_SIZE = 10;
      const startNytPage = Math.floor(offset / NYT_PAGE_SIZE);
      const offsetInNytPage = offset % NYT_PAGE_SIZE;

      const firstData = await fetchNytPage(query, startNytPage);
      const firstDocs = firstData?.response?.docs ?? [];
      const totalHitsFromApi = firstData?.response?.meta?.hits ?? 0;

      let buffer = [...firstDocs];
      let currentNytPage = startNytPage + 1;
      const neededTotal = offsetInNytPage + limit;
      const maxExtraPages = 5;
      let extraFetched = 0;

      while (buffer.length < neededTotal && extraFetched < maxExtraPages) {
        const nextData = await fetchNytPage(query, currentNytPage);
        const nextDocs = nextData?.response?.docs ?? [];
        if (!nextDocs.length) break;
        buffer = buffer.concat(nextDocs);
        currentNytPage += 1;
        extraFetched += 1;
      }

      const uniqueBuffer = buffer.filter(
        (v, i, a) => a.findIndex((el) => el._id === v._id) === i
      );

      const results = uniqueBuffer.slice(
        offsetInNytPage,
        offsetInNytPage + limit
      );

      let totalPages = 0;
      if (typeof totalHitsFromApi === 'number' && totalHitsFromApi > 0) {
        totalPages = Math.ceil(totalHitsFromApi / limit);
      } else if (uniqueBuffer.length > 0) {
        const knownTotal = offset + uniqueBuffer.length;
        totalPages = Math.ceil(knownTotal / limit);
      }

      return { results, totalPages };
    } catch (error) {
      const status = error?.response?.status;
      if (status === 429) toast.error('Too many requests. Please wait.');
      else if (status === 403 || status === 401)
        toast.error('Invalid API key.');
      else toast.error('Failed to load news.');
      return thunkAPI.rejectWithValue(error.message || 'Error fetching news');
    }
  }
);

export const fetchId = createAsyncThunk(
  'news/idNews',
  async ({ id }, thunkAPI) => {
    try {
      if (!id) return thunkAPI.rejectWithValue('Missing article ID');
      if (!API_KEY) return thunkAPI.rejectWithValue('Missing API key');

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
      if (error.response?.status === 429)
        toast.error('Too many requests. Please wait.');
      else toast.error('Failed to load news details.');
      return thunkAPI.rejectWithValue(
        error.message || 'Error fetching news details'
      );
    }
  }
);
