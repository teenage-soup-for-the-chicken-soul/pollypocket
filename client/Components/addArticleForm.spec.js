/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddArticleForm from './addArticleForm';
import store from '../store/index';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('<AddArticleForm /> component', () => {
  let addArticleWrapper;

  beforeEach('Create component', () => {
    addArticleWrapper = shallow(<AddArticleForm store={store} />)
      .dive()
      .dive();
  });

  it('renders two form labels', () => {
    expect(addArticleWrapper.find('label').length).to.be.equal(2);
  });

  it('has a `title` field initialized on state and is a string', () => {
    expect(addArticleWrapper.state().title).to.be.a('string');
  });

  it('has an `articleURL` field initialized on state and is a string', () => {
    expect(addArticleWrapper.state().articleURL).to.be.a('string');
  });

  it('has a `goalId` field initialized on state and is a string', () => {
    expect(addArticleWrapper.state().goalId).to.be.a('string');
  });

  it('has a `open` field initialized on state and is a boolean', () => {
    expect(addArticleWrapper.state().open).to.be.a('boolean');
  });

  it('has a `open` field initialized on state it initially starts off as false', () => {
    expect(addArticleWrapper.state().open).to.be.equal(false);
  });

  it('has a `loading` field initialized on state and is a boolean', () => {
    expect(addArticleWrapper.state().loading).to.be.a('boolean');
  });

  it('has a `loading` field initialized on state it initially starts off as false', () => {
    expect(addArticleWrapper.state().loading).to.be.equal(false);
  });
});
