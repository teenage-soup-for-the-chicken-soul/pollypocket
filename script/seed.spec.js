'use strict'
/* global describe it */

const seed = require('./postgres-seed')

describe('seed script', () => {
  it('completes successfully', seed)
})
