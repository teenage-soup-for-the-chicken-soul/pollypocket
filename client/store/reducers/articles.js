import axios from 'axios';
import history from '../../history';
import db from '../../db';
import PouchDB from 'pouchDB'
import Find from 'pouchdb-find';
PouchDB.plugin(Find);

export const GET_ARTICLES = 'GET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';

export const GET_GOALS = 'GET_GOALS';

export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export const deleteArticle = (articleId) => ({
  type: DELETE_ARTICLE,
  articleId
});


export const getArticles = articles => ({
  type: GET_ARTICLES,
  articles,
});

export const getGoals = goals => ({
  type: GET_GOALS,
  goals,
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


export const getGoalsThunk = userKey => async dispatch => {
  try {
    let currentdb = await new db('articles');
    await currentdb.createDBIndex();
    const res = await currentdb.findGoals(userKey);
    dispatch(getGoals(res.docs));
  } catch (error) {
    console.log('Error getting goals in thunk', error);
  }
};

export const addGoalThunk = obj => async dispatch => {
  try {
    let currentdb = await new db('articles');
    await currentdb.createDBIndex();
    const res = await currentdb.addGoal(obj);
    // const sortedGoals = res.docs.sort();
    // dispatch(getGoals(sortedGoals));
  } catch (error) {
    console.log('Error adding new goal in thunk', error);
  }
};

export const deleteArticleThunk = (article) => async dispatch => {
  try {
    let currentdb = await new db('articles');
    await currentdb.deleteArticle(article)

     await currentdb.createDBIndex();
    const res = await currentdb.findArticle(article.userKey);
    dispatch(getArticles(res.docs));
  }
  catch (error) {
  console.log('Error in the delete thunk', error)
  }

}


const initialState = {
  articles: [],
  goals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.articles };
    case GET_GOALS:
      return { ...state, goals: action.goals };
    default:
      return state;
  }
};
