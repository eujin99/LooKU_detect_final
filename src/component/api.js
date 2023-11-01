// import axios from 'axios';

// export const fetchPosts = async () => {
//   try {
//     const response = await axios.get('http://localhost:8888/api/posts'); //crawl.js 서버 주소
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to fetch posts');
//   }
// };
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.105:8888/api', // Flask 서버 주소
});

export const fetchPosts = async () => {
  try {
    const response = await apiClient.get('/posts'); // /api/posts 엔드포인트에 GET 요청
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch posts');
  }
};