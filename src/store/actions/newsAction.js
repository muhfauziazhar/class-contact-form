import {FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR} from '../type';

export const fetchNews = () => ({
  type: FETCH_NEWS,
});

export const fetchNewsSuccess = (data) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: data,
});

export const fetchNewsError = (error) => ({
  type: FETCH_NEWS_ERROR,
  payload: error,
});
