import axios from 'axios';

export const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/posts');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch posts');
  }
};