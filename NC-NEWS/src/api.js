import axios from "axios";
const baseUrl = 'https://chazzat18-nc-news.onrender.com'

export const getArticles = () => {
  return axios
    .get(`${baseUrl}/api/articles`)
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      throw error;
    });
};

export const getArticleById = (articleId) => {
  return axios
    .get(`${baseUrl}/api/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      throw error;
    });
};
export const getCommentsByArticleId = (articleId) => {
  return axios
    .get(`${baseUrl}/api/articles/${articleId}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      throw error;
    });
};
export const patchVotes = (newVote, articleId) => {
  return axios
    .patch(`${baseUrl}/api/articles/${articleId}`, {inc_votes: newVote})
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      throw error;
    });
};

export default {getArticleById, getArticles, getCommentsByArticleId, patchVotes};