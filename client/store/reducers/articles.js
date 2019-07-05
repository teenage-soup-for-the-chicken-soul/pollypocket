import axios from 'axios';
import db from '../../db';
import PouchDB from 'pouchDB';
import Find from 'pouchdb-find';
PouchDB.plugin(Find);

// ACTION TYPES
export const GET_ARTICLES = 'GET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

// ACTION CREATORS
export const deleteArticle = articleId => ({
  type: DELETE_ARTICLE,
  articleId,
});

export const getArticles = articles => ({
  type: GET_ARTICLES,
  articles,
});

// THUNKS
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
    await axios.post('/api/articles', obj);
    console.log('object in add art. thunk', obj);
    let currentdb = await new db('articles');
    await currentdb.createDBIndex();
    const res = await currentdb.findArticle(obj.userKey);
    console.log('res docs', res.docs);
    dispatch(getArticles(res.docs));
  } catch (error) {
    console.log('Error adding new article in thunk', error);
  }
};

export const deleteArticleThunk = article => async dispatch => {
  try {
    let currentdb = await new db('articles');
    await currentdb.deleteArticle(article);

    await currentdb.createDBIndex();
    const res = await currentdb.findArticle(article.userKey);
    dispatch(getArticles(res.docs));
  } catch (error) {
    console.log('Error in the delete thunk', error);
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
