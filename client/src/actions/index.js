import { FETCH_BLOGS } from './types';
import axios from 'axios';

export const getBlogs = () => async dispatch => {
  const { data } = await axios.get('http://localhost:5000/api/blogs');
  dispatch({ type: FETCH_BLOGS, payload: data });
};
