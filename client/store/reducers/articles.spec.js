import {expect} from 'chai'

import {default as reducer} from './articles'
import {getArticles, getGoals} from './articles'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('articles reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      articles: []
    })
  })
})

describe('Thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    articles: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('add a article', () => {
    it('eventually dispatches the GET_ARTICLES action', async () => {
      const fakeArticle = {id: 1, name: 'Cody', email: 'Cody@email.com'}
      mockAxios.onGet('/api/articles').replyOnce(200, fakeArticle)
      await store.dispatch(getArticles(fakeArticle))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ARTICLES')
      expect(actions[0].articles).to.be.deep.equal(fakeArticle)
    })
  })
})
