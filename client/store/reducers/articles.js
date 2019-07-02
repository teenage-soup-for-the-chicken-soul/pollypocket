import axios from 'axios';
import history from '../../history';
import db from '../../db';
// import { log } from 'util';

export const GET_ARTICLES = 'GET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';

export const getArticles = articles => ({
  type: GET_ARTICLES,
  articles,
});

export const getArticlesThunk = userKey => async dispatch => {
  try {
    let currentdb = await new db('articles');
    await currentdb.createDBIndex();
    const res = await currentdb.findArticle(userKey);
    dispatch(getArticles(res.docs));
  } catch (error) {
    console.log('Error getting articles in thunk', error);
  }
};

export const addArticleThunk = obj => async dispatch => {
  try {
    await axios.post('/routes/articles', obj);
    let currentdb = await new db('articles');
    await currentdb.createDBIndex();
    const res = await currentdb.findArticle(obj.userKey);
    dispatch(getArticles(res.docs));
  } catch (error) {
    console.log('Error adding new article in thunk', error);
  }
};

const initialState = {
  articles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.articles };
    default:
      return state;
  }
};