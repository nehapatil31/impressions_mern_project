import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const url = 'http://localhost:5000/posts';
// const url = 'https://impressions01.herokuapp.com/posts';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (data) => API.post('/user/signin', data);
export const signup = (data) => API.post('/user/signup', data);
export const googleSignin = (data) => API.post('/user/google', data);

//News api
export const fetchNews = (data) => API.post('/news', data);
export const bookmarkNews = (title) => API.patch(`/news/${title}`);