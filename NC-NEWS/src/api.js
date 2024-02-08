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
export const getUsers = () => {
  return axios
    .get(`${baseUrl}/api/users`)
    .then((response) => {
      return response.data.users;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteCommentById = (commentId) => {
  return axios
    .delete(`${baseUrl}/api/comments/${commentId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};


export const postCommentByArticleId = (newComment, username, article_id) => {
  const postCommentData = {
    body: newComment,
    username: username,
  };
  return axios
    .post(`${baseUrl}/api/articles/${article_id}/comments`, postCommentData)
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      throw error;
    });
};

export default {getArticleById, getArticles, getCommentsByArticleId, patchVotes, getUsers, postCommentByArticleId, deleteCommentById};