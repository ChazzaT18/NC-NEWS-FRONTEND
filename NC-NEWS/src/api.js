import axios from "axios";
const baseUrl = 'https://chazzat18-nc-news.onrender.com'

export const getArticles = () => {
  return axios
    .get(`${baseUrl}/api/articles`)
    .then((response) => {
      return response.data.articles;
    });
};

export const getArticleById = (articleId) => {
  return axios
    .get(`${baseUrl}/api/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    });
};
export const getCommentsByArticleId = (articleId) => {
  return axios
    .get(`${baseUrl}/api/articles/${articleId}/comments`)
    .then((response) => {
      return response.data.comments;
    });
};

export default {getArticleById, getArticles, getCommentsByArticleId};