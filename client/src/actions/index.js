import { FETCH_BLOGS, CREATE_BLOG } from './types';
import axios from 'axios';

export const getBlogs = () => async dispatch => {
  const { data } = await axios.get('http://localhost:5000/api/blogs');
  dispatch({ type: FETCH_BLOGS, payload: data });
};

export const createBlog = (title, content, push) => async dispatch => {
  push('/blogs');
  
  await axios.post(
    'http://localhost:5000/api/blogs',
    { title, content },
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
  
  dispatch({ type: CREATE_BLOG });
};
